import React, {Component} from 'react'

class ParentsPage extends Component {
    constructor(props){
        super(props)
        this.state={
                isLoading:false,
                isError:false,
                parents: [],
                selectedParent:null
        };
        this.handleCreate=this.handleCreate.bind(this);
        this.handleEdit= this.handleEdit.bind(this);
        this.handleDelete= this.handleDelete.bind(this);
    }
 
    handleCreate = (parent) => this.setState({isCreateClick : true})
    handleEdit= (parent) => this.setState({ selectedParent : parent})
    handleDelete= async (parent)=> {
        const response = await fetch('http://localhost:8095/dnevnik/parent/'+ parent.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
            mode:'cors'
        } );
        //this.setState({})
    }
    handleEditSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch ('http://localhost:8095/dnevnik/parent/' + this.state.selectedParent.id, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedParent),
            headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
        },
        mode:'cors'
        });
        this.setState({selectedParent : null})
    //this.componentDidMount();
    }
    handleCreateSubmit = async (e, parent) => { debugger;
        e.preventDefault()
        const response = await fetch('http://localhost:8095/dnevnik/parent', {
            method:'POST',
            body: JSON.stringify(this.state.newParent),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
            mode:'cors'
        });
        this.setState({ isCreateClick: false, newParent: null})
        //this.componentDidMount();
    }
        async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/parent', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const parents = await response.json();
            this.setState({parents, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {parents, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }

        return parents.length > 0
            ? (
                <div>
                    <h3 id="title">All parents</h3>
                  <table id='users'>
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
        return this.state.parents.map((parent) => {
            return(
                <tr key={parent.id}>
                    <td>{parent.id}</td>
                    <td>{parent.firstName}</td>
                    <td>{parent.lastName}</td>
                    <td>{parent.email}</td>
                    <td>{parent.user.USER_ID}</td>
                    <td>{parent.user.username}</td>
                    <td><button onClick={(e) => this.handleCreateSubmit(e, parent)}>Create</button></td>
                    <td><button onClick={(e) => this.handleEditSubmit(e, parent)}>Edit</button></td>
                    <td><button onClick={(e) => this.handleDelete(parent)}>Delete</button></td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.parents[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default ParentsPage;