import React , {Component} from 'react';
import {BrowserRouter, Switch} from 'react-router-dom'
import CreateDepartment from '../Department/CreateDepartment'
import EditDepartment from '../Department/EditDepartment'

class DepartmentPage extends Component {
    constructor(props){
        super(props);
        this.state={
				selectedDep: null,
				isEditing:false,
				isCreating:false,
                isLoading:false,
                isError:false,
                deps: []
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    
	handleCreate = () => {
		this.setState({isCreating: true,
			isEditing: false})
	}
    
	handleEdit = ( value ) => {
		console.log(value);
		this.setState({selectedDep: value,
			isCreating: false,
			isEditing: true})
	}
	
    async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/department', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const deps = await response.json();
            this.setState({deps, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {deps, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....or doesnt have any department</div>
        }
    
		let creating;
		if (this.state.isCreating) {
            creating = <CreateDepartment
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role} />;
		}
	
		let editing;
		if (this.state.isEditing) {
            editing = <EditDepartment 
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role}
            selectedDep = {this.state.selectedDep} />;			
		}
	
        return deps.length > 0
            ? (
                <div>
                    <BrowserRouter>
                    <p>To create new department, please click<br />
                    <button onClick={ value => this.handleCreate()}>Create</button></p>
                    <Switch />    
				    {creating}
				    {editing}
                    <Switch />
                    <h3>School departments for 2019/2020</h3>
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
        return this.state.deps.map((dep) => {
            return(
                <tr key={dep.DepartmentID} >
                    <td>{dep.name}</td>
                    <td>{dep.classroom}</td>
                    <td><button onClick={value => this.handleEdit(dep)}>Edit</button></td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.deps[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default DepartmentPage;