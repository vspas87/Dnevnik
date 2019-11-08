import React, {Component} from 'react'
import '../Teachers/Teacher.css'
import {NavLink} from 'react-router-dom'
import {Route,BrowserRouter, Switch, Redirect} from 'react-router-dom'
import SubjectPage from '../Subject/SubjectPage'
import ProfilTeacher from '../Teachers/ProfilTeacher'
import TeacherClass from '../Teachers/TeacherClass'
import ListGradeTeacher from './ListGradeTeacher'


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
              <div>
              <BrowserRouter>
                <div className="teachernavigation">
                    <div className="teacheruter">
                    <h2>Welcome to the TEACHERS page of "Elektronski Dnevnik!"</h2>
                    </div>
                    <div className="teacheroption"><p><b>For more information about subjects, 
                        classes , students and their grades, please choose in following options:</b></p>
                    </div>
                    <button onClick={this.handleLogout} className="buttonTop">Logout</button>
                    <button onClick={this.handleGoBack} className="buttonTop">GoBack</button>
                    <div className="ateacher ct">
                    <NavLink className="button" activeClassName="active" to="/class">Classes</NavLink>
                    </div>
                    <div className="bteacher ct">
                    <NavLink className="button" activeClassName="active" to="/subject">Subjects</NavLink>
                    </div>
                    <div className="cteacher ct">
                    <NavLink className="button" activeClassName="active" to="/profil">Profil</NavLink>
                    </div>
                    <div className="hteacher ct">
              <Switch/>
                    <Route exact path="/class" 
                    component={(props) => <TeacherClass
                        userId={this.props.userId}
                        role={this.props.role}
                        username={this.props.username}
                        password={this.props.password}/>}/>
                    <Route exact path="/subject" 
                    component={(props) => <SubjectPage
                        userId={this.props.userId}
                        role={this.props.role}
                        username={this.props.username}
                        password={this.props.password}/>}/>
                    <Route exact path="/profil" 
                    component={(props) => <ProfilTeacher
                        userId={this.props.userId}
                        role={this.props.role}
                        username={this.props.username}
                        password={this.props.password}/>}/>
              <Switch />
            </div>
           </div>
           </BrowserRouter>
           </div>
        )
    }
    }
export default TeacherPage;