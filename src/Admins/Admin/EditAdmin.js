import React, {Component} from 'react'

class EditAdmin extends Component {
    constructor(props){
    super(props);	
    this.state = {
            firstName : props.selectedAdmin.firstName,
	        lastName : props.selectedAdmin.lastName,
            adminID : props.selectedAdmin.id
	  }
  }
  
  handleEdit = async (e) => {
        var url = 'http://localhost:8095/dnevnik/admin/update/' + this.state.adminID + 
        '?firstName=' + this.state.firstName + 
        '&lastName=' + this.state.lastName;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",                
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            adminID: this.state.adminID,
            firstName: this.state.firstName,
			lastName: this.state.lastName
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
        value="Save updated inforamtion"
			onClick={() => this.handleEdit()}
        >Save changed info!
        </button>
        <br />  
        </div>
        )
        }
}
export default EditAdmin;