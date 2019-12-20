import React, {Component} from 'react'

class EditTeacher extends Component {
    constructor(props){
    super(props);	
    this.state = {
          firstName : props.selectedTeacher.firstName,
	        lastName : props.selectedTeacher.lastName,
          teacherID : props.selectedTeacher.id,
          subjectID: props.selectedTeacher.SUBJECT_ID
	  }
  }
  handleEdit = async (e) => {
        var url = 'http://localhost:8095/dnevnik/teacher/update/' + this.state.teacherID + 
        '?firstName=' + this.state.firstName + 
        '&lastName=' + this.state.lastName + 
        '&subjectID='+ this.state.subjectID;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",                
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            teacherID: this.state.teacherID,
			      subjectID: this.state.subjectID
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert('Succesfully changed data. Please refresh!')
        } else {            
            console.log("Greska");
            alert('Please check limitation in back!')
        }
        console.log(response);
      }
	firstNameHandler = (event) => {
		this.setState({firstName: event.target.value});
	}
	lastNameHandler = (event) => {
		this.setState({lastName: event.target.value});
  }
  subjectIDHandler = (event) => {
		this.setState({subjectID: event.target.value});
  }

  render() {
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="firstName">Change firstname</label>
        <input 
          type="text"
          value={this.state.firstName}
          onChange={this.firstNameHandler}
          required />
          <br />
        <label htmlFor="lastname">Change lastname</label>
        <input 
          type="text"
          value={this.state.lastName}
          onChange={this.lastNameHandler}
          required />
          <br />
        <label htmlFor="subjectID">Change subjectID</label>
        <input 
          type="text"
          value={this.state.subjectID}
          onChange={this.subjectIDHandler}
          required />
          <br /> 
        <button
        value="Save update"
			onClick={() => this.handleEdit()}
        >Save changed teacher and following information!
        </button>
        <br />  
        </div>
        )
        }
}
export default EditTeacher;