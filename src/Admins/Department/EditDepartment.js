import React, {Component} from 'react'

class EditDepartment extends Component {
  constructor(props){
	console.log("EditDepartment");
    super(props);	
    this.state = {
        name : props.selectedDep.name,
        classroom : props.selectedDep.classroom,
        id: props.selectedDep.DepartmentID
	}
  }
  
  handleEdit = async (e) => {
        var url = 'http://localhost:8095/dnevnik/department/update/' + 
        this.state.id + '?name=' + 
        this.state.name + '&classroom=' + 
        this.state.classroom;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",                
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            name: this.state.name,
            classroom: this.state.classroom,
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert('Succesfully changed data. Please refresh!')
        } else {            
            console.log("Greska");
            alert('Please check limitation!')
        }
        console.log(response);
      }
	nameHandler = (event) => {
		this.setState({name: event.target.value});
	}
	
	classroomHandler = (event) => {
		this.setState({classroom: event.target.value});
	}

  render() {
	console.log("Edit Dept props");
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="name">Change name</label>
        <input 
          type="text"
          value={this.state.name}
          onChange={this.nameHandler}
          required />
          <br />
        <label htmlFor="classroom">Change classroom</label>
        <input 
          type="text"
          value={this.state.classroom}
          onChange={this.classroomHandler}
          required />
          <br />
        <button
        value="Save  updated department"
			onClick={() => this.handleEdit()}
        >Save edited/changed data!
        </button>
        
      <br />  
      </div>
        )
        }
}
export default EditDepartment;