import React, {Component} from 'react'

class EditClass extends Component {
  constructor(props){
    super(props);
    this.state = {
       
      }
  }

  handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value });
    };
  
  handleSubmit = async (event) => {
    event.preventDefault();

  }
  render() {
    return (
        <div className="aaaa ct">
        <label htmlFor="className">Change class name</label>
        <input 
          id="className" 
          name="className" 
          type="text"
          //value={this.props.className}
          //onChange={this.props.onChange}
          required />
          <br />
        <label htmlFor="schoolYear">Change school year</label>
        <input 
          id="schoolYear" 
          name="schoolYear" 
          type="text"
          //value={this.props.schoolYear}
          //onChange={this.props.onChange} 
          required />
          <br />
        <button
        value="Save update"
        onClick={this.props.handleEdit}
        >Save changed data!
        </button>
        
      <br />  
      </div>
        )
        }
}
export default EditClass;