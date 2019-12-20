import React, {Component} from 'react'
import CreateListGradeTeacher from './CreateListGradeTeacher';
import EditListGradeTeacher from './EditListGradeTeacher'
import {BrowserRouter, Switch} from 'react-router-dom'


class ListGradeTeacher extends Component {
    constructor(props){
        super(props);
        this.state={
                selectedGrade: null,
                isEditing:false,
                isCreating:false,
                isLoading:false,
                isError:false,
                gradings: [],
        };
        this.handleCreate=this.handleCreate.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
    }

    handleCreate=() => {
        this.setState({isCreating:true,
        isEditing:false})
    }
    handleEdit = (value) => {
        console.log(value);
        this.setState({selectedGrade:value,
        isCreating:false,
        isEditing:true})
    }

    async componentDidMount() {
        this.setState({isLoading:true});
        let classID= this.props.classID
        const response = await fetch(`http://localhost:8095/dnevnik/teacher/student/grades/${classID}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
            }
        });
        if(response.ok) {
            const gradings= await response.json();
            this.setState({gradings, isLoading:false})
        } else {
            this.setState({isLoading:false, isError:true})
        }
    }
    renderTableHeader() {
        return(
            <tr>
                <td>Grading ID</td>
                <td>Class ID</td>
                <td>Student ID</td>
                <td>Student</td>
                <td>Parent ID</td>
                <td>Subject ID</td>
                <td>Exam type</td>
                <td>Exam grade</td>
            </tr>
        )
    }
    renderTableData() {
        return this.state.gradings.map((grade) => {
            return(
                <tr key={grade.GRADING_ID}>
                    <td>{grade.GRADING_ID}</td>
                    <td>{grade.student.schoolClass.CLASS_ID}</td>
                    <td>{grade.student.id}</td>
                    <td>{grade.student.firstName} {grade.student.lastName}</td>
                    <td>{grade.student.parent.id}</td>
                    <td>{grade.teacher.subject.SUBJECT_ID}</td>
                    <td>{grade.examType}</td>
                    <td>{grade.examGrade}</td>
                    <td><button onClick={value => this.handleEdit(grade)}>Edit</button></td>
                </tr>
            )
        })
    }  
    render() {
        const {gradings, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading grades...</div> 
        }
        if(isError){
            return <div>You havent give any grades yet! </div>
        }
        
        let creating;
		if (this.state.isCreating) {
            creating = <CreateListGradeTeacher
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role} />;
		}
	
		let editing;
		if (this.state.isEditing) {
            editing = <EditListGradeTeacher 
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role}
            selectedGrade = {this.state.selectedGrade} />;			
		}
        return gradings.length > 0
            ? (
                <div>
                    <BrowserRouter>
                    <h3>Your given grades from  for class No. {this.props.classID}:</h3>
                    <p style={{color:'white', backgroundColor:'purple'}}>
                        If you would like to add more grades, please click here:
                    <button onClick={ value => this.handleCreate()}>Create</button></p>
                    <Switch />    
                        {creating}
				        {editing}
                    <Switch />
                    <table className="tablemark">
                      <thead>
                            {this.renderTableHeader()}
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
           
        }   
export default ListGradeTeacher;