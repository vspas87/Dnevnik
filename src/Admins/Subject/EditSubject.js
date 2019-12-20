import React, {Component} from 'react'

class EditSubject extends Component {
    constructor(props){
    super(props);	
    this.state = {
          name : props.selectedSubject.name,
	        weeklyFund : props.selectedSubject.weeklyFund,
	        SUBJECT_ID : props.selectedSubject.SUBJECT_ID
	  }
  }
  
  handleEdit = async (e) => {
        var url = 'http://localhost:8095/dnevnik/subject/update/' + 
        this.state.SUBJECT_ID + 
        '?name=' + this.state.name + 
        '&weeklyFund=' + this.state.weeklyFund;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",                
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            name: this.state.name,
            weeklyFund: this.state.weeklyFund,
			      subjectID: this.state.SUBJECT_ID
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
	nameHandler = (event) => {
		this.setState({name: event.target.value});
	}
	
	weeklyFundHandler = (event) => {
		this.setState({weeklyFund: event.target.value});
	}

  render() {
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="name">Change subject name</label>
        <input 
          type="text"
          value={this.state.name}
          onChange={this.nameHandler}
          required />
          <br />
        <label htmlFor="weeklyFund">Change weekly fund</label>
        <input 
          type="text"
          value={this.state.weeklyFund}
          onChange={this.weeklyFundHandler}
          required />
          <br />
        <button
        value="Save update"
			onClick={() => this.handleEdit()}
        >Save changed subject!
        </button>
        <br />  
        </div>
        )
        }
}
export default EditSubject;