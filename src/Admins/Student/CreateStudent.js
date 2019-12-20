import React, {Component} from 'react'

class CreateStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : '',
      role:'',
      firstname:'',
      lastname:'',
      classID:'',
      parent:''
   }
}

handleCreate = async (e) => {
     var url = 'http://localhost:8095/dnevnik/user/addstudent?username=' + this.state.username + 
     '&password=' + this.state.password + 
     '&role=' + this.state.role + 
     '&firstname=' + this.state.firstname +
     '&lastname=' + this.state.lastname +
     '&classID=' + this.state.classID +
     '&parent=' + this.state.parent;
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
         lastname: this.state.lastname,
         classID: this.state.classID,
         parent: this.state.parent
       })
     })
     if(response.ok) {
         const serverResponse = await response.json();
         console.log(serverResponse);
         alert('Just created new student and user. Please refresh!');
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
firstnameHandler = (event) => {
 this.setState({firstname: event.target.value});
 } 
lastnameHandler = (event) => {
     this.setState({lastname: event.target.value})
 }
classHandler =(event) => {
     this.setState({classID: event.target.value})
 }
parentHandler = (event) => {
   this.setState({parent: event.target.value})
}
roleHandler = (event) => {
  this.setState({role: event.target.value})
}

render() {
console.log("Create Teacher props");
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
     <label htmlFor="classID">Add classID</label>
     <input 
       type="text"
       value={this.state.classID}
       onChange={this.classHandler}
       required />
       <br /> 
      <label htmlFor="parent">Add parentID</label>
      <input 
       type="text"
       value={this.state.parent}
       onChange={this.parentHandler}
       required />
       <br /> 
     <button
       value="Save new student"
       onClick={() => this.handleCreate()}
     >Save new student and user directly!
     </button>  
     <br />  
     </div>
     )
     }
}
export default CreateStudent;