import React , {Component} from 'react';

class AdminClass extends Component {
    constructor(props){
        super(props);
        this.state={
                isLoading:false,
                isError:false,
                aclass: [],
                selectedClass:null
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleCreateSubmit= this.handleCreateSubmit.bind(this);
        /*this.handleEdit = this.handleEdit.bind(this);
        this.handleEditSubmit=this.handleEditSubmit.bind(this);    
        this.handleDelete=this.handleDelete.bind(this);*/
    }
    handleCreate = () => this.setState({isCreateClick : true})
    
    handleCreateSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8095/dnevnik/class/addnew' + 
        this.state.aclas.className + '' + this.state.aclas.schoolYear, {
            method:'POST',
            body: JSON.stringify(this.state.newClass),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
        });
        this.setState({ isCreateClick: false, newClass: null})
        console.log(this.state.newClass)
    
    /*handleEdit = (aclas) => this.setState({selectedClass : aclas})
    handleEditSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch ('http://localhost:8095/dnevnik/class/update/' + this.state.selectedClass.CLASS_ID, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedClass),
            headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
        },
        });
        this.setState({selectedClass : null})


    handleDelete = (aclas)=> {
        const response = fetch('http://localhost:8095/dnevnik/class/delete/'+ this.state.aclas.CLASS_ID, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
        } );
        }
        }*/
    }
    handleChange = (e) => {
        this.setState({
            selectedClass: {
                ...this.state.selectedClass,
                [e.target.name]: e.target.value
            }
        })
    }
    async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/class', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const aclass = await response.json();
            this.setState({aclass, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {aclass, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....or doesnt have any classes</div>
        }
    
        return aclass.length > 0
            ? (
                <div>
                    <p>To create new class, please click on CREATE button<br />
                    <button onClick={(e) => this.handleCreate()}>Create</button>
                    <button onClick={(e) => this.handleCreateSubmit()}>Create => Submit</button></p>
                    <h3>All school classes for 2019/2020</h3>
                  <table className="tablemark">
                      <thead>
                            <tr>{this.renderTableHeader()}</tr>
                      </thead>
                      <tbody>
                          {this.renderTableData()}
                      </tbody>
                  </table>
                </div>
            )
            : null
        }
    
renderTableData() {
        return this.state.aclass.map((aclas) => {
            return(
                <tr key={aclas.CLASS_ID} >
                    <td>{aclas.CLASS_ID}</td>
                    <td>{aclas.className}</td>
                    <td>{aclas.schoolYear}</td>
                    <td><button onClick={(e) => this.handleEdit()}>Edit</button></td>
                    <td><button onClick={(e) => this.handleEditSubmit()}>Edit => Submit</button></td>
                    <td><button onClick={(e) => this.handleDelete()}>Delete</button></td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.aclass[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default AdminClass;
