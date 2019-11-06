import React, {Component} from 'react'
import {NavLink, Route,BrowserRouter, Switch, Redirect} from 'react-router-dom'
import ClassStudentGrades from '../Teachers/ClassStudentGrades'

class ClassPage extends Component {
    constructor(){
        super();
        this.state={
                isLoading:false,
                isError:false,
                classes: [],
                selectedClass: ''
        };
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick = (value) => {
        const response = fetch ('http://localhost:8095/dnevnik/grading/class/' + this.state.selectedClass.CLASS_ID, {
            method: 'GET',
            headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
        },
        }); 
        this.setState({selectedClass: value}) 
    }
    async componentDidMount() {
        this.setState({isLoading:true});
        const response = await fetch('http://localhost:8095/dnevnik/teacher/class', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
            }
        });
        if(response.ok) {
            const classes= await response.json();
            this.setState({classes, isLoading:false})
        } else {
            this.setState({isLoading:false, isError:true})
        }
    }

    render() {
        const {classes, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }

        return classes.length > 0
            ? (
                <div>
                    <BrowserRouter>
                    <h3>Your teaching classes:</h3>
                  <table className="tablemark">
                      <thead>
                            <tr>
                                <th>ID</th>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>School Year</th>
                            </tr>
                      </thead>
                      <tbody>
                      {this.state.classes.map((classe) => {
                        return(
                            <tr key={classe.schoolClass.CLASS_ID} >
                                <td>
                                    <NavLink activeClassName="active"
                                             to="/classStudentGrades">
                                    {classe.schoolClass.CLASS_ID}
                                    </NavLink>
                                </td>
                                <Route exact path="/classStudentGrades" 
                                        component={(props) => <ClassStudentGrades
                                        userId={this.props.userId}
                                        role={this.props.role}
                                        username={this.props.username}
                                        password={this.props.password}/>}/>
                                <td>{classe.teacher.subject.name}</td>
                                <td>{classe.schoolClass.className}</td>
                                <td>{classe.schoolClass.schoolYear}</td>
                                <td><a href='#' onClick={() => {this.handleClick(classe.schoolClass.CLASS_ID)}}>View</a></td>
                           
                            </tr>
                        )})}
                      </tbody>
                  </table>
                  </BrowserRouter>
                </div>
           
            )
            : null
        }
        
}
export default ClassPage;