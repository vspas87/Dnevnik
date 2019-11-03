import React, {Component} from 'react'

class StudentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isError: false,
            students: [],
            selectedStudent: null,
            firstName:'',
            lastName:'',
            id:'',
            username:'',
            password:''

        };
    }

    handleEdit = (student) => this.setState({selectedStudent :student})

    handleEditSubmit = (e) => {
        const students = [...this.state.students]
        const index= students.findIndex((student) => student.id === this.state.selectedStudent.id)
        students.splice(index,1,this.state.selectedStudent)
        this.setState ({students, selectedStudent: null})
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
            selectedStudent: {
                ...this.state.selectedStudent,
                [e.target.name]: e.target.value
            }
        })
    }

    async componentDidMount() {
        this.setState({ isLoading: true});
        const response = await fetch('http://localhost:8095/dnevnik/student',{
            method: 'GET',
            headers:{
                'Authorization': 'Basic ' + window.btoa(this.state.username + ":" + this.state.password),
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if(response.ok) {
            const student = await response.json();
            this.setState({student, isLoading: false})
        
        } else {
            this.setState ({ isLoading: false, isError: true })
        }
    }
    render() {
        const {students, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }

        return students.length > 0
            ? (
                <div>
                    <h1 id="title">Studenti</h1>
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
        return this.state.students.map((student) => {
            return(
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.user.role}</td>
                    <td><div onClick={() => this.handleDelete(student.id)}>Delete</div></td>   
                    <td><div onClick={() => this.handleEdit(student.id)}>Edit</div></td> 
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.students[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
 handleDelete = (studentId) => {
     const {students, isLoading, isError} = this.state
     if(isLoading) {
         return <div>Loading....</div>
     }
     if( isError) {
         return <div>Error.....</div>
     }
    }
}
    export default StudentTable;