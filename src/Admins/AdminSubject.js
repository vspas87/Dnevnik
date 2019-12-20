import React , {Component} from 'react';
import EditSubject from './Subject/EditSubject';
import CreateSubject from './Subject/CreateSubject';
import {BrowserRouter, Switch} from 'react-router-dom'

class AdminSubject extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedSubject: null,
            isEditing:false,
            isCreating:false,
            isLoading:false,
            isError:false,
            subjects: [],      
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleCreate = () => {
		this.setState({isCreating: true,
			isEditing: false})
	}
    
	handleEdit = ( value ) => {
		console.log(value);
		this.setState({selectedSubject: value,
			isCreating: false,
			isEditing: true})
	}
        async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/subject', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const subjects = await response.json();
            this.setState({subjects, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {subjects, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....Are you sure this school doesnt teach ANY subject?</div>
        }

        let creating;
		if (this.state.isCreating) {
            creating = <CreateSubject
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role} />;
		}
	
		let editing;
		if (this.state.isEditing) {
            editing = <EditSubject 
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role}
            selectedSubject = {this.state.selectedSubject} />;			
		}
        return subjects.length > 0
            ? (
                <div>
                    <BrowserRouter>
                    <p>To create new subject, please click<br />
                    <button onClick={ value => this.handleCreate()}>Create</button></p>
                    <Switch />    
				    {creating}
				    {editing}
                    <Switch />
                    <h3 style={{backgroundColor:'grey'}}>All subjects and following info for 2019/2020</h3>
                  <table className="tablemark">
                      <thead>
                            <tr>{this.renderTableHeader()}</tr>
                      </thead>
                      <tbody>
                          {this.renderTableData()}
                      </tbody>
                  </table>
                  </BrowserRouter>
                </div>
            )
            : null
        }
    
renderTableData() {
        return this.state.subjects.map((subject) => {
            return(
                <tr key={subject.SUBJECT_ID} >
                    <td>{subject.SUBJECT_ID}</td>
                    <td>{subject.name}</td>
                    <td>{subject.weeklyFund}</td>
                    <td><button onClick={value => this.handleEdit(subject)}>Edit</button></td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.subjects[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default AdminSubject;
