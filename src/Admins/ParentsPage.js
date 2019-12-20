import React, {Component} from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'
import CreateParent from '../Admins/Parent/CreateParent'
import EditParent from '../Admins/Parent/EditParent'

class ParentsPage extends Component {
    constructor(props){
        super(props)
        this.state={
            selectedParent: null,
            isEditing:false,
			isCreating:false,
            isLoading:false,
            isError:false,
            parents: [],
            isDeleting: false

        };
        this.handleCreate=this.handleCreate.bind(this);
        this.handleEdit= this.handleEdit.bind(this);
        this.handleDelete= this.handleDelete.bind(this);
    }
    handleCreate = () => {
		this.setState({isCreating: true,
			isEditing: false})
	}
    
	handleEdit = ( value ) => {
		console.log(value);
		this.setState({selectedParent: value,
			isCreating: false,
			isEditing: true})
	}
    
    handleDelete = async (value)=> {
        const response = await fetch('http://localhost:8095/dnevnik/user/', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
        } )}

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
            return <div>Error...No parents at all? Sure?</div>
        }
        let creating;
		if (this.state.isCreating) {
            creating = <CreateParent
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role} />;
		}
	
		let editing;
		if (this.state.isEditing) {
            editing = <EditParent 
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role}
            selectedParent = {this.state.selectedParent} />;			
		}
        return parents.length > 0
            ? (
                <div>
                    <BrowserRouter>
                    <p>To create new parent/user, please click<br />
                    <button onClick={ value => this.handleCreate()}>Create</button></p>
                    <Switch />    
				    {creating}
				    {editing}
                    <Switch />
                    <h3 style={{backgroundColor:'grey'}}>All parents for 2019/2020</h3>
                    <table className="tablemark">
                      <thead>
                            <tr>{this.renderTableHeader()}</tr>
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
        return this.state.parents.map((parent) => {
            return(
                <tr key={parent.id}>
                    <td>{parent.id}</td>
                    <td>{parent.firstName}</td>
                    <td>{parent.lastName}</td>
                    <td>{parent.email}</td>
                    <td>{parent.user.USER_ID}</td>
                    <td><button onClick={(e) => this.handleEdit(parent)}>Edit</button></td>
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