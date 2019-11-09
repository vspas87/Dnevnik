import React , {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Route,BrowserRouter, Switch, Redirect} from 'react-router-dom'
import CreateClass from '../Admins/Class/CreateClass'
import EditClass from '../Admins/Class/EditClass'

class AdminClass extends Component {
    constructor(props){
        super(props);
        this.state={
                isLoading:false,
                isError:false,
                aclass: []
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleCreate = async (e) => {
        console.log("izvrsava handlecreate");
        const response = await fetch('http://localhost:80/dnevnik/class/addnew', {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            className: '',
            schoolYear: '',
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
        } else {            
            console.log("Greska prilikom odgovora");
        }
        console.log(response);
    }
    
    handleEdit = async (e) => {
        console.log("izvrsava handleEdit");
        const response = await fetch('http://localhost:80/dnevnik/class/update', {
          method: 'PUT',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            className: '',
            schoolYear: '',
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
        } else {            
            console.log("Greska");
        }
        console.log(response);
    }
    async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/class', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const aclass = await response.json();
            this.setState({aclass, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {aclass, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....or doesnt have any classes</div>
        }
    
        return aclass.length > 0
            ? (
                <div>
                    <BrowserRouter>
                    <p>To create new class, please click on CREATE button<br />
                    <NavLink activeClassName="active" to="/createClass" >Create</NavLink></p>
                    <h3>All school classes for 2019/2020</h3>
                  <table className="tablemark">
                      <thead>
                            <tr>{this.renderTableHeader()}</tr>
                      </thead>
                      <tbody>
                          {this.renderTableData()}
                      </tbody>
                  </table>
                <Switch />
                <Route 
                  exact path="/createClass"
                  component={(props) => <CreateClass
                    userId={this.props.userId}
                    role={this.props.role}
                    username={this.props.username}
                    password={this.props.password}/>}/>
                <Route
                exact path="/editClass"
                component={(props) => <EditClass
                    userId={this.props.userId}
                    role={this.props.role}
                    username={this.props.username}
                    password={this.props.password}/>}/>
                    <Switch />
                  </BrowserRouter>
                </div>
            )
            : null
        }
    
renderTableData() {
        return this.state.aclass.map((aclas) => {
            return(
                <tr key={aclas.CLASS_ID} >
                    <td>{aclas.CLASS_ID}</td>
                    <td>{aclas.className}</td>
                    <td>{aclas.schoolYear}</td>
                    <td><button onClick={() => this.handleEdit()}><NavLink to="/editClass">Edit</NavLink></button></td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.aclass[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default AdminClass;
