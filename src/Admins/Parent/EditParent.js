import React, {Component} from 'react'

class EditParent extends Component {
    constructor(props){
    super(props);	
    this.state = {
          firstName : props.selectedParent.firstName,
	        lastName : props.selectedParent.lastName,
          parentID : props.selectedParent.id,
          email : props.selectedParent.email
	}
  }
  
  handleEdit = async (e) => {
        var url = 'http://localhost:8095/dnevnik/parent/update/' + 
        this.state.parentID + '?firstName=' + 
        this.state.firstName + '&lastName=' + 
        this.state.lastName + '&email=' + this.state.email;
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
            parentID: this.state.parentID,
            email:this.state.parentID
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
      emailHandler = (event) => {
		  this.setState({email: event.target.value});
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
        <label htmlFor="lastName">Change lastname</label>
        <input
          type="text"
          value={this.state.lastName}
          onChange={this.lastNameHandler}
          required />
          <br />
        <button
        value="Save update"
			  onClick={() => this.handleEdit()}
        >Save changed parent info!
        </button>
        <br />  
        </div>
        )
        }
}
export default EditParent;