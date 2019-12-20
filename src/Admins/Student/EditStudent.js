import React, {Component} from 'react'

class EditStudent extends Component {
    constructor(props){
    super(props);	
    this.state = {
          firstName : props.selectedStudent.firstName,
	        lastName : props.selectedStudent.lastName,
          studentID : props.selectedStudent.id,
          classID: props.selectedStudent.schoolClass.CLASS_ID,
          parentID: props.selectedStudent.parent.id
	}
  }
  
  handleEdit = async (e) => {
        var url = 'http://localhost:8095/dnevnik/student/update/' + this.state.studentID + 
        '?firstName=' + this.state.firstName + 
        '&lastName=' + this.state.lastName +
        '&parentID=' + this.state.parentID + 
        '&classID=' + this.state.classID;
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
            studentID: this.state.studentID,
            classID: this.state.classID,
            parentID: this.state.parentID
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert('Succesfully changed data. Please refresh page!')
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
  classIDHandler = (event) => {
		this.setState({classID: event.target.value});
	}
	parentIDHandler = (event) => {
		this.setState({parentID: event.target.value});
  }

  render() {
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="firstName">Change firstName</label>
        <input 
          type="text"
          value={this.state.firstName}
          onChange={this.firstNameHandler}
          required />
          <br />
        <label htmlFor="lastName">Change lastName</label>
        <input 
          type="text"
          value={this.state.lastName}
          onChange={this.lastNameHandler}
          required />
          <br />
        <label htmlFor="classID">Change classID</label>
        <input 
          type="text"
          value={this.state.classID}
          onChange={this.classIDHandler}
          required />
          <br />
        <label htmlFor="parentID">Change parentID</label>
        <input 
          type="text"
          value={this.state.parentID}
          onChange={this.parentIDHandler}
          required />
          <br />  
        <button
        value="Save update"
			  onClick={() => this.handleEdit()}
        >Save changed student!
        </button>
        <br />  
        </div>
        )
        }
}
export default EditStudent;