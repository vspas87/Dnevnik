import React , {Component} from 'react';
import EditTeacher from './Teacher/EditTeacher';
import {BrowserRouter, Switch} from 'react-router-dom'
import CreateTeacher from './Teacher/CreateTeacher';

class AdminTeacher extends Component {
    constructor(props){
        super(props);
        this.state={
                isLoading:false,
                isError:false,
                teachers: [],
                selectedTeacher: null,
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
		this.setState({selectedTeacher: value,
			isCreating: false,
			isEditing: true})
	}
    async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/teacher', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const teachers = await response.json();
            this.setState({teachers, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {teachers, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Please check your teachers</div>
        }
        let creating;
		if (this.state.isCreating) {
            creating = <CreateTeacher
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role} />;
		}
	
		let editing;
		if (this.state.isEditing) {
            editing = <EditTeacher 
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role}
            selectedTeacher = {this.state.selectedTeacher} />;			
		}
        return teachers.length > 0
            ? (
                <div>
                    <Switch />    
				    {creating}
				    {editing}
                    <Switch />
                    <h1 id="title" style={{backgroundColor:'grey'}}>Information about all teachers of <br />"Elektronski dnevnik"</h1>
                    <p style={{backgroundColor:'purple',textAlign:'center'}}>To add new teacher, please click on:
                    <button onClick={ value => this.handleCreate()}>Create</button></p>
                    <table className="tablemark">
                    <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Subject ID</th>
                            <th>Subject name</th>
                            <th>WeeklyFund</th>
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
        return this.state.teachers.map((teacher) => {
            return(
                <tr key={teacher.id} >
                    <td>{teacher.id}</td>
                    <td>{teacher.firstName} {teacher.lastName}</td>
                    <td>{teacher.user.username}</td>
                    <td>{teacher.subject.SUBJECT_ID}</td>
                    <td>{teacher.subject.name}</td>
                    <td>{teacher.subject.weeklyFund}</td>
                    <td><button onClick={(e) => this.handleEdit(teacher)}>Edit</button></td>
                </tr>
            )
        })
    }
}
export default AdminTeacher;
