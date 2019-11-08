import React, {Component} from 'react'
import ListGradeTeacher from './ListGradeTeacher'

class TeacherClass extends Component {
    constructor(props) {
        super(props);
        this.state= {
            lectures: [],
            selectedLecture: null,
            isLoading: false,
            isError: false,
            izbor:''
        };
        this.handleChoise= this.handleChoise.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick = (value) => {
        this.setState({
            selectedLecture:value
        })
    }
    handleChoise = (izbor) => {
        this.setState({
            izbor
        })
    }

    async componentDidMount() {
        this.setState({isLoading:true})
        const response = await fetch('http://localhost:8095/dnevnik/teacher/class', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
            }
        });
        if(response.ok) {
            const lectures= await response.json();
            this.setState({lectures, isLoading:false})
        } else {
            this.setState({isLoading:false, isError:true})
        }
    }
    renderTableHeader() {
        return(
            <tr>
                <td>#</td>
                <td>Teacher Name</td>
                <td>Subject Name</td>
                <td>Class ID</td>
                <td>School Year</td>
                <td>Class Name</td> 
            </tr>
        )
    }
    renderTableData() {
        return this.state.lectures.map((lecture) => {
            return(
                <tr key={lecture.TEACHING_ID}>
                    <td>{lecture.TEACHING_ID}</td>
                    <td>{lecture.teacher.firstName}</td>
                    <td>{lecture.teacher.subject.name}</td>
                    <td>{lecture.schoolClass.CLASS_ID}</td>
                    <td>{lecture.schoolClass.schoolYear}</td>
                    <td>{lecture.schoolClass.className}</td>
                    <td><a href='#' onClick={() => {this.handleClick(lecture.TEACHING_ID)}}>View</a></td>
                </tr>
            )
        })
    }

    render() {
        const {lectures, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }
        return lectures.length > 0
            ? (
                <div>
                    <h3>Your teaching classes:</h3>
                    <table className="tablemark">
                      <thead>
                            {this.renderTableHeader()}
                      </thead>
                      <tbody>
                            {this.renderTableData()}
                      </tbody>
                  </table>
                  <div>
                      {this.state.selectedLecture !== null &&
                      <div>
                      <ListGradeTeacher
                      classID={this.state.selectedLecture.TEACHING_ID}
                      className={this.state.selectedLecture.className}
                      userId={this.props.userId}
                      username={this.props.username}
                      password={this.props.password} />
                      }<br/>
                  </div>
                      }
                </div>
           </div>
            )
            : null
        }
        
}

export default TeacherClass;