import React, {Component} from 'react'

class CreateClass extends Component {
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
        <label htmlFor="className">Enter class name</label>
        <input 
          id="className" 
          name="className" 
          type="text"
          //value={this.props.className}
          //onChange={this.props.onChange}
          required />
          <br />
        <label htmlFor="schoolYear">Enter school year</label>
        <input 
          id="schoolYear" 
          name="schoolYear" 
          type="text"
          //value={this.props.schoolYear}
          //onChange={this.props.onChange} 
          required />
          <br />
        <button
        value="Save"
        //onClick={this.props.handleCreate}
        >Submit new data!
        </button>
        
      <br />  
      </div>
        )
        }
}
export default CreateClass;