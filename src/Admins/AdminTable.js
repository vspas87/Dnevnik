import React, {Component} from 'react'

class AdminTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isError: false,
            admins: [],
            selectedAdmin: null
        };
        this.handleEdit= this.handleEdit.bind(this);
        this.handleEditSubmit=this.handleEditSubmit.bind(this);
    }

    handleEdit = (admin) => this.setState({selectedAdmin :admin})

    handleEditSubmit = (e) => {
        const admins = [...this.state.admins]
        const index= admins.findIndex((admin) => admin.id === this.state.selectedAdmin.id)
        admins.splice(index,1,this.state.selectedAdmin)
        this.setState ({admins, selectedAdmin: null})
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
            selectedAdmin: {
                ...this.state.selectedAdmin,
                [e.target.name]: e.target.value
            }
        })
    }

    async componentDidMount() {
        this.setState({ isLoading: true});
        const response = await fetch('http://localhost:8095/dnevnik/admin',{
            method: 'GET',
            headers:{
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        });
        if(response.ok) {
            const admins = await response.json();
            this.setState({admins, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    render() {
        const {admins, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }

        return admins.length > 0
            ? (
                <div>
                    <p>To add new admin, please click on button "CREATE"
                        <br/></p>
                    <h1 id="title">All admins</h1>
                  <table id='users'>
                      <thead>
                            <tr>
                            <th>#</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>User_id</th>
                            <th>Username</th>
                            </tr>
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
        return this.state.admins.map((admin) => {
            return(
                <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td>{admin.firstName}</td>
                    <td>{admin.lastName}</td>
                    <td>{admin.user.USER_ID}</td>
                    <td>{admin.user.username}</td>
                    <td><button onClick={(e) => this.handleEdit(e)}>Edit</button></td>
                    <td><button onClick={(e) => this.handleEditSubmit()}>Submit</button></td>
                </tr>
            )
        })
    }
    }
    export default AdminTable;