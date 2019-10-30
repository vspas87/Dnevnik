import React, {Component} from 'react'
import '../Teachers/Teacher.css'
import {NavLink} from 'react-router-dom'
import {Route,BrowserRouter, Switch, Redirect} from 'react-router-dom'
import ClassPage from '../Class/ClassPage'
import DepartmentPage from '../Department/DepartmentPage'
import MarkPage from '../Marks/MarkPage'
import SubjectPage from '../Subject/SubjectPage'
import StudentPage from '../Students/StudentPage'
import ProfilPage from '../Pages/ProfilPage'


class TeacherPage extends Component {
    state={
        navigation: false
    }
    handleGoBack = () => {
        this.setState({navigate:true})
        this.props.history.goBack();
      }
    handleLogout = () => {
        localStorage.clear();
        this.setState({navigate: true})
        this.props.history.push('/login')
        alert('In few seconds, you will be log out!')
    };
        render() {
          const {navigate}= this.state;
          if(navigate) {
          return <Redirect to='/login' push={true} />;
          }
          return(
              <BrowserRouter>
                <div>
                    <h2>Welcome to the TEACHERS page of "Elektronski Dnevnik!"</h2>
                    <p>For more information about classes, departments, students and their grades, please choose in following options:</p>
              <button onClick={this.handleLogout}>Logout</button>
              <button onClick={this.handleGoBack}>GoBack</button>
              <ul>
                <li>
                    <NavLink activeClassName="active" to="/class">Classes</NavLink></li>
                <li>
                    <NavLink activeClassName="active" to="/department">Departments</NavLink></li>
                <li>
                    <NavLink activeClassName="active" to="/subjects">Subjects</NavLink></li>
                <li>
                    <NavLink activeClassName="active" to="/students">Students</NavLink></li>
                <li>
                    <NavLink activeClassName="active" to="/mark">Marks</NavLink></li>
                <li>
                    <NavLink activeClassName="active" to="/profil">Profil</NavLink></li>
              </ul>
              <Switch>
                    <Route exact path="/class" component={ClassPage}/>
                    <Route exact path="/department" component={DepartmentPage}/>
                    <Route exact path="/subject" component={SubjectPage}/>
                    <Route exact path="/student" component={StudentPage}/>
                    <Route exact path="/mark" component={MarkPage}/>
                    <Route exact path="/profil" component={ProfilPage}/>
              </Switch>
              <div className="TeachersPano"></div>
           </div>
           </BrowserRouter>
        )
    }
    }
export default TeacherPage;