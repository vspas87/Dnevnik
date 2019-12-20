import React, {Component} from 'react'

class CreateDepartment extends Component {
  constructor(props){
    super(props);
    this.state = {
        name : '',
        classroom : '',
      }
  }

  handleCreate = async (e) => {
        var url = 'http://localhost:8095/dnevnik/department/add?name=' + this.state.name + 
        '&classroom=' + this.state.classroom;
        console.log(url);
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
            alert('Just created new department');
        } else {            
            console.log("Greska prilikom odgovora");
            alert('Please check again in sql and back')
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
	console.log("Create Department props");
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="name">Add department name</label>
        <input 
          type="text"
          value={this.state.name}
          onChange={this.nameHandler}
          required />
          <br />
        <label htmlFor="classroom">Add department classroom</label>
        <input 
          type="text"
          value={this.state.classroom}
          onChange={this.classroomHandler}
          required />
          <br />
        <button
          value="Save new class"
			    onClick={() => this.handleCreate()}
        >Save new department!
        </button>  
        <br />  
        </div>
        )
        }
}
export default CreateDepartment;