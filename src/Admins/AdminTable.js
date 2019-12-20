import React, {Component} from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'
import CreateAdmin from '../Admins/Admin/CreateAdmin'
import EditAdmin from '../Admins/Admin/EditAdmin'

class AdminTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isError: false,
            admins: [],
            selectedAdmin: null,
			isEditing:false,
			isCreating:false,
        };
    this.handleEdit= this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    }
    handleCreate = () => {
		this.setState({isCreating: true,
			isEditing: false})
	}
    
	handleEdit = ( value ) => {
		console.log(value);
		this.setState({selectedAdmin: value,
			isCreating: false,
			isEditing: true})
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
            return <div>This aplication doesnt have any admins ?</div>
        }
        let creating;
		if (this.state.isCreating) {
            creating = <CreateAdmin
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role} />;
		}
	
		let editing;
		if (this.state.isEditing) {
            editing = <EditAdmin 
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role}
            selectedAdmin = {this.state.selectedAdmin} />;			
		}
        return admins.length > 0
            ? (
                <div>
                    <BrowserRouter>
                    <Switch />    
				    {creating}
				    {editing}
                    <Switch />
                    <h1 id="title" style={{backgroundColor:'grey'}}>Information about admins of <br />"Elektronski dnevnik"</h1>
                    <p style={{backgroundColor:'purple', textAlign:'center'}}>To add new admin, please click on:
                    <button onClick={ value => this.handleCreate()}>Create</button></p>
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
                  </BrowserRouter>
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
                    <td><button onClick={(e) => this.handleEdit(admin)}>Edit</button></td>
                </tr>
            )
        })
    }
    }
    export default AdminTable;