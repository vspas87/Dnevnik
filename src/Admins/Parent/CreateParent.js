import React, {Component} from 'react'

class CreateParent extends Component {
  constructor(props){
    super(props);
    this.state = {
         username : '',
         password : '',
         role:'',
         firstname:'',
         lastname:'',
         email:''
      }
  }

  handleCreate = async (e) => {
        var url = 'http://localhost:8095/dnevnik/user/addparent?username=' + this.state.username + 
        '&password=' + this.state.password + 
        '&role=' + this.state.role + 
        '&firstname=' + this.state.firstname +
        '&lastname=' + this.state.lastname +
        '&email=' + this.state.email;
        console.log(url);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
            firstname: this.state.firstname,
            password: this.state.password,
            email: this.state.email
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert('Just created new parent and user. Please refresh!');
        } else {            
            console.log("Greska prilikom odgovora");
            alert('Please check again in sql.')
        }
        console.log(response);
    }

	usernameHandler = (event) => {
		this.setState({username: event.target.value});
	}	
	passwordHandler = (event) => {
		this.setState({password: event.target.value});
	}
    roleHandler = (event) => {
		this.setState({role: event.target.value});
    }
	firstnameHandler = (event) => {
		this.setState({firstname: event.target.value});
    } 
    lastnameHandler = (event) => {
        this.setState({lastname: event.target.value})
    }
    emailHandler =(event) => {
        this.setState({email: event.target.value})
    }

    render() {
	console.log("Create Parent props");
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="username">Add username</label>
        <input 
          type="text"
          value={this.state.username}
          onChange={this.usernameHandler}
          required />
          <br />
        <label htmlFor="password">Add password</label>
        <input 
          type="text"
          value={this.state.password}
          onChange={this.passwordHandler}
          required />
          <br />
        <label htmlFor="role">Add role</label>
        <input 
          type="text"
          value={this.state.role}
          onChange={this.roleHandler}
          required />
          <br />  
        <label htmlFor="firstname">Add firstname</label>
        <input 
          type="text"
          value={this.state.firstname}
          onChange={this.firstnameHandler}
          required />
          <br />
        <label htmlFor="lastname">Add lastname</label>
        <input 
          type="text"
          value={this.state.lastname}
          onChange={this.lastnameHandler}
          required />
          <br />
        <label htmlFor="email">Add email</label>
        <input 
          type="text"
          value={this.state.email}
          onChange={this.emailHandler}
          required />
          <br /> 
        <button
          value="Save new parent/user"
			    onClick={() => this.handleCreate()}
        >Save new parent and user directly!
        </button>  
        <br />  
        </div>
        )
        }
}
export default CreateParent;