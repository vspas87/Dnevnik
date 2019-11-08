import React, {Component} from 'react'
import '../Class/Class.css'
import CreateClassForm from './CreateClassForm'

class CreateClass extends Component {
  constructor(props){
    super(props);
    this.state = {
        className: '',
        schoolYear: '',
        isError:false
      }
  }

  handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value });
    };
  
  handleSubmit = async (event) => {
    event.preventDefault();
    /*const className = this.className.value;
    const schoolYear = this.schoolYear.value;
   */

    const response = await fetch('http://localhost:8095/dnevnik/class/addnew', {
      method:'POST',
      body: JSON.stringify(this.state.className, this.state.schoolYear),
      headers: {
        'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
        "Content-type": "application/json; charset=UTF-8",
        'Accept': 'application/json'
      }
    });
    if(response.ok) {
      const newclass = await response.json();
      this.setState({newclass, isError:false})
    } else {
      this.setState({
        isError: true
      })
    }
  };

  render() {
    return (
      <div>
        <CreateClassForm
          className={this.state.className}
          schoolYear={this.state.schoolYear}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          />
      </div>
        )
        }
}
export default CreateClass;