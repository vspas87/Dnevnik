import React , {Component} from 'react';
import '../Marks/Mark.css'

class MarkPage extends Component {
    constructor(props){
        super(props)
        this.state={
                isLoading:false,
                isError:false,
                students: [],
                selectedStudent:null
        };
    }
        async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/grading/student', {
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
            return <div>Error....</div>
        }

        return students.length > 0
            ? (
                <div>
                    <h3>Your grades for 2019/2020</h3>
                  <table className="tablemark">
                  <thead>
                            <tr>
                            <th>Exam Type</th>
                            <th>Exam Date</th>
                            <th>Exam Grade</th>
                            <th>Teacher</th>
                            <th>Subject</th>
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
                <tr key={student.GRADING_ID} >
                    <td>{student.examType}</td>
                    <td>{student.examDate}</td>
                    <td>{student.examGrade}</td>
                    <td>{student.teacher.lastName}</td>
                    <td>{student.teacher.subject.name}</td>
                </tr>
            )
        })
    }
}
export default MarkPage;