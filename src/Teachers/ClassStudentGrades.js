import React, {Component} from 'react'

class ClassStudentGrades extends Component {
    constructor(){
        super();
        this.state={
                isLoading:false,
                isError:false,
                teachers: []
        };
    }
    async componentDidMount() {
        this.setState({isLoading:true});
        const response = await fetch('http://localhost:8095/dnevnik/teacher/student/grades', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
            }
        });
        if(response.ok) {
            const teachers= await response.json();
            this.setState({teachers, isLoading:false})
        } else {
            this.setState({isLoading:false, isError:true})
        }
    }

    render() {
        const {teachers, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }

        return teachers.length > 0
            ? (
                <div>
                    <h3>In following are shown your teaching classes, student and their given grades</h3>
                  <table className="tablemark">
                      <thead>
                            <tr>
                                <th>Class Name</th>
                                <th>Student Name</th>
                                <th>Student Lastname</th>
                                <th>Grading id</th>
                                <th>Exam Type</th>
                                <th>Exam Grade</th>
                                <th>Exam Date</th>
                                <th>Subject Name</th>
                            </tr>
                      </thead>
                      <tbody>
                      {this.state.teachers.map((teacher) => {
                        return(
                            <tr key={teacher.GRADING_ID} >
                                <td>{teacher.student.schoolClass.className}</td>
                                <td>{teacher.student.firstName}</td>
                                <td>{teacher.student.lastName}</td>
                                <td>{teacher.GRADING_ID}</td>
                                <td>{teacher.examType}</td>
                                <td>{teacher.examGrade}</td>
                                <td>{teacher.examDate}</td>
                                <td>{teacher.subject.name}</td>
                            </tr>
                            )
                        })
                    }
                      </tbody>
                  </table>
                </div>
            )
            : null
        }
        
}
export default ClassStudentGrades;