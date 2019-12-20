import React, {Component} from 'react'

class CreateSubject extends Component {
  constructor(props){
    super(props);
    this.state = {
         name : '',
	     weeklyFund : '',
      }
  }

  handleCreate = async (e) => {
        var url = 'http://localhost:8095/dnevnik/subject/add?name=' + this.state.name + 
        '&weeklyFund=' + this.state.weeklyFund;
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
            weeklyFund: this.state.weeklyFund,
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert('Just created new subject. Please refresh!');
        } else {            
            console.log("Greska prilikom odgovora");
            alert('Please check again in sql and back')
        }
        console.log(response);
    }
    
	
	classNameHandler = (event) => {
		this.setState({name: event.target.value});
	}
	
	fundHandler = (event) => {
		this.setState({weeklyFund: event.target.value});
	}

  render() {
	console.log("EditClass props");
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="subjectName">Add subject name</label>
        <input 
          type="text"
          value={this.state.name}
          onChange={this.classNameHandler}
          required />
          <br />
        <label htmlFor="weeklyFund">Add weekly funds</label>
        <input 
          type="text"
          value={this.state.weeklyFund}
          onChange={this.fundHandler}
          required />
          <br />
        <button
          value="Save new subject"
			    onClick={() => this.handleCreate()}
        >Save new subject!
        </button>  
        <br />  
        </div>
        )
        }
}
export default CreateSubject;