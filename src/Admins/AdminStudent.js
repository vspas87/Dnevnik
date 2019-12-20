import React , {Component} from 'react';
import EditStudent from './Student/EditStudent';
import {BrowserRouter, Switch} from 'react-router-dom'
import CreateStudent from './Student/CreateStudent';


class AdminStudent extends Component {
    constructor(props){
        super(props);
        this.state={
                isLoading:false,
                isError:false,
                students: [],
                selectedStudent: null,
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
this.setState({selectedStudent: value,
    isCreating: false,
    isEditing: true})
}
    
async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/student', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const students = await response.json();
            this.setState({students, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
}
    render() {
        const {students, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....School doesnt have any students?</div>
        }
        let creating;
		if (this.state.isCreating) {
            creating = <CreateStudent
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role} />;
		}
	
		let editing;
		if (this.state.isEditing) {
            editing = <EditStudent 
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role}
            selectedStudent = {this.state.selectedStudent} />;
        }	
        return students.length > 0
            ? (
                <div>
                    <Switch />    
				    {creating}
				    {editing}
                    <Switch />
                    <h1 id="title" style={{backgroundColor:'grey'}}>Information about all students of <br />"Elektronski dnevnik"</h1>
                    <p style={{color:'purple'},{textAlign:'right'}}>To add new student, please click on:
                    <button onClick={ value => this.handleCreate()}>Create</button></p>
                    <table className="tablemark">
                      <thead>
                      <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Class ID</th>
                            <th>Class</th>
                            <th>Parent ID</th>
                            <th>Parent name</th>
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
        return this.state.students.map((student) => {
            return(
                <tr key={student.id} >
                    <td>{student.id}</td>
                    <td>{student.firstName} {student.lastName}</td>
                    <td>{student.schoolClass.CLASS_ID}</td>
                    <td>{student.schoolClass.className}</td>
                    <td>{student.parent.id}</td>
                    <td>{student.parent.firstName} {student.parent.lastName}</td>
                    <td><button onClick={value => this.handleEdit(student)}>Edit</button></td>
                </tr>
            )
        })
    }
}
export default AdminStudent;
