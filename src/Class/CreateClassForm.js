import React, { Component } from 'react'

class CreateClassForm extends Component  {
    render() {
      return (
        <div>
       
        <label htmlFor="className">Enter class name</label>
        <input 
          id="className" 
          name="className" 
          type="text"
          value={this.props.className}
          onChange={this.props.onChange}
          required />
          <br />
        <label htmlFor="schoolYear">Enter school year</label>
        <input 
          id="schoolYear" 
          name="schoolYear" 
          type="text"
          value={this.props.schoolYear}
          onChange={this.props.onChange} 
          required />
          <br />
        <button
        value="Save"
        onClick={this.props.onSubmit}
        >Submit new data!
        </button>

      <br />  
    </div>
      )
        
        }
    }
export default CreateClassForm;