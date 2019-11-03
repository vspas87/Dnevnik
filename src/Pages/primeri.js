import React, {Component} from 'react'
import '../Admins/Admin.css'
import {NavLink, Route, Redirect, BrowserRouter, Switch, WithRouter} from 'react-router-dom'
import StudentPage from '../Students/StudentPage'
import TeacherPage from '../Teachers/TeacherPage'
import ClassPage from '../Class/ClassPage'
import DepartmentPage from '../Department/DepartmentPage'
import SubjectPage from '../Subject/SubjectPage'
import ParentsPage from '../Admins/ParentsPage'
import ProfilPage from '../Pages/ProfilPage'
import AdminTable from '../Admins/AdminTable'
import AppWithRouter from '../AppWithRouter'

class AdminPage2 extends Component {
  state={
      navigation: false
  }
  handleLogout = () => {
      localStorage.clear();
      this.setState({navigate: true})
      this.props.history.push('/login')
      alert('In few moments, you will be logged out!')
  };

  handleGoBack = () => {
    this.setState({navigate:true})
    this.props.history.goBack();
  }
      render() {
        const {navigate}= this.state;
        if(navigate) {
        return <Redirect to='/login' push={true} />;
        }
        return(
          <BrowserRouter>
            <div className="gridnavigation">
              <div className="aa ct">
              <h2>Welcome to ADMIN page of 'Elektronski Dnevnik!'</h2></div>
              <div className="ba ct">
              <p>For more information, please choose from following options:</p></div>
              <button className='buttonTop' onClick={this.handleLogout}>Log off</button>
              <button className='buttonTop' onClick={this.handleGoBack}>Go Back</button>
              <div className="ca ct">
              <NavLink className='button' to="/student">Students</NavLink></div>
              <div className="da ct">
              <NavLink className='button' to="/teacher">Teachers</NavLink></div>
              <div className="ea ct">
              <NavLink className='button' to="/parents">Parents</NavLink></div>
              <div className="fa ct">
              <NavLink className='button' to="/admins">Admins</NavLink></div>
              <div className="ta ct">
              <NavLink className='button' to="/subject">Subjects</NavLink></div>
              <div className="ra ct">
              <NavLink className='button' to="/class">Classes</NavLink></div>
              <div className="ja ct">
              <NavLink className='button' to="/department">Departments</NavLink></div>
              <div className="ga ct">
              <NavLink className='button' 
              to="/profil" 
              username={this.props.username}
              password={this.props.password}>Profil</NavLink></div>
          <div className="ia ct">  
          <Switch/>
                <Route exact path="/student" component={StudentPage}/>
                <Route exact path="/teacher" component={TeacherPage}/>
                <Route exact path="/parents" component={ParentsPage}/>
                <Route exact path="/admins" component={AdminTable}/>            
                <Route exact path="/subject" component={SubjectPage}/>
                <Route exact path="/class" component={ClassPage} />
                <Route exact path="/department" component={DepartmentPage}/>
                <Route exact path="/profil"
                username={this.props.username}
                password={this.props.password}
                component={ProfilPage}/>
                /*render={({staticContext, ...props}) => <ProfilPage {...props} />}/>*/
          <Switch />          
          </div>
          </div>
          </BrowserRouter>
        )
      }
    }
export default AdminPage2;