import React, {Component} from 'react'

class CreateListGradeTeacher extends Component {
  constructor(props){
    super(props);
    this.state = {
         studentID : '',
         subjectID : '',
         examType:'',
         examGrade:'',
         classID:'',
         parentID:''
      }
  }

  handleCreate = async (e) => {
        var url = 'http://localhost:8095/dnevnik/grading/teacher/add?studentID=' + this.state.studentID + 
        '&subjectID=' + this.state.subjectID + 
        '&examType=' + this.state.examType + 
        '&examGrade=' + this.state.examGrade + 
        '&parentID=' + this.state.parentID +
        '&classID=' + this.state.classID
        console.log(url);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            studentID: this.state.studentID,
            subjectID: this.state.subjectID,
            examType: this.state.examType,
            examGrade: this.state.examGrade,
            parentID: this.state.parentID,
            classID:this.state.classID
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert("You have succesfully entered grade!")
        } else {            
            console.log("Greska!!!");
            alert('Please, check again if it is your class and your student.')
        }
        console.log(response);
    }
	
	studentHandler = (event) => {
		this.setState({studentID: event.target.value});
	}
	
	subjectHandler = (event) => {
		this.setState({subjectID: event.target.value});
  }
  examTypeHandler = (event) => {
		this.setState({examType: event.target.value});
	}
	examGradeHandler = (event) => {
		this.setState({examGrade: event.target.value});
  }
  classHandler = (event) => {
      this.setState({classID: event.target.value});
  }
  parentHandler = (event) => {
      this.setState({parentID: event.target.value});
  }

  render() {
	console.log("Propsovi svi");
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="gradingStudent">Add new grade for <br />Student</label>
        <input 
          type="text"
          value={this.state.studentID}
          onChange={this.studentHandler}
          required />
          <br />
        <label htmlFor="gradingForSubject">Subject</label>
        <input 
          type="text"
          value={this.state.subjectID}
          onChange={this.subjectHandler}
          required />
          <br />
        <label htmlFor="gradingExamType">Exam type</label>
        <input 
          type="text"
          value={this.state.examType}
          onChange={this.examTypeHandler}
          required />
          <br />
        <label htmlFor="gradingExam">Grade</label>
        <input 
          type="text"
          value={this.state.examGrade}
          onChange={this.examGradeHandler}
          required />
          <br />
          <label htmlFor="gradingParent">Parent</label>
        <input 
        type="text"
        value={this.state.parentID}
        onChange={this.parentHandler}
        required />
          <br />
        <label htmlFor="gradingClass">Class</label>
        <input 
        type="text"
        onChange={this.classHandler}
        value={this.state.classID}
        required />
          <br />
           <br />
        <button
        value="Save update"
      onClick={() => this.handleCreate()}
        >Save created data!
        </button>
      <br />  <br />
      </div>
        )
        }
}
export default CreateListGradeTeacher;