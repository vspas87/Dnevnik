import React, {Component} from 'react'

class EditListGradeTeacher extends Component {
  constructor(props){
    super(props);	
    this.state = {
        examType : props.selectedGrade.examType,
        examGrade : props.selectedGrade.examGrade,
        gradingID : props.selectedGrade.GRADING_ID
	}
  }
  
  handleEdit = async (e) => {
        var url = 'http://localhost:8095/dnevnik/grading/update/' + this.state.gradingID+ 
        '?newGrade=' + this.state.examGrade + 
        '&examType=' + this.state.examType;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",                
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            examGrade: this.state.examGrade,
            gradingID: this.state.gradingID,
            examType: this.state.examType
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert('Successfully added updated grade.')
        } else {            
            console.log("Error");
            alert('Please check if its your class and our subject!')
        }
        console.log(response);
      }
  examGradeHandler = (event) => {
	  this.setState({examGrade: event.target.value});
    }
  examTypeHandler = (event) => {
    this.setState({examType: event.target.value});
    }
  
  render() {
	console.log("Edit props");
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="editGradingExam">Update grade</label>
        <input 
          type="text"
          value={this.state.examGrade}
          onChange={this.examGradeHandler}
          required />
          <br />
        <label htmlFor="editGradingType">Update exam type</label>
        <input 
          type="text"
          value={this.state.examType}
          onChange={this.examTypeHandler}
          required />
        <br />
        <button
        value="Save updates"
			  onClick={() => this.handleEdit()}
        >Save updated grade and other information
        </button> 
      <br />  
      </div>
        )
        }
}
export default EditListGradeTeacher;