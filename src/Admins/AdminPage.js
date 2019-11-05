import React, {Component} from 'react'
import '../Admins/Admin.css'
import {NavLink, Route, Redirect, BrowserRouter, Switch, WithRouter} from 'react-router-dom'
import AdminStudent from '../Admins/AdminStudent'
import AdminTeacher from '../Admins/AdminTeacher'
import ClassPage from '../Class/ClassPage'
import DepartmentPage from '../Department/DepartmentPage'
import SubjectPage from '../Subject/SubjectPage'
import ParentsPage from '../Admins/ParentsPage'
import ProfilPage from '../Pages/ProfilPage'
import AdminTable from '../Admins/AdminTable'


class AdminPage extends Component {
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
          <div>
          <BrowserRouter>
          <div className="gridnavigation">
              <div className="aaa ct">
              <h2>Welcome to ADMIN page of 'Elektronski Dnevnik!'</h2></div>
              <div className="baa ct">
              <p>For more information, please choose from following options:</p></div>
              <button className='buttonTop' onClick={this.handleLogout}>Log off</button>
              <button className='buttonTop' onClick={this.handleGoBack}>Go Back</button>
              <div className="caa ct">
              <NavLink className='button' to="/student">Students</NavLink></div>
              <div className="daa ct">
              <NavLink className='button' to="/teacher">Teachers</NavLink></div>
              <div className="eaa ct">
              <NavLink className='button' to="/parents">Parents</NavLink></div>
              <div className="faa ct">
              <NavLink className='button' to="/admins">Admins</NavLink></div>
              <div className="taa ct">
              <NavLink className='button' to="/subject">Subjects</NavLink></div>
              <div className="raa ct">
              <NavLink className='button' to="/class">Classes</NavLink></div>
              <div className="jaa ct">
              <NavLink className='button' to="/department">Departments</NavLink></div>
              <div className="gaa ct">
              <NavLink className='button' to="/profil" >Profil</NavLink></div>
          <div className="iaa ct">  
          <Switch/>
                <Route exact path="/student" 
                  component={(props) => <AdminStudent
                  userId={this.props.userId}
                  role={this.props.role}
                  username={this.props.username}
                  password={this.props.password}/>}/>

                <Route exact path="/teacher" 
                  component={(props) => <AdminTeacher 
                  userId={this.props.userId}
                  role={this.props.role}
                  username={this.props.username}
                  password={this.props.password}/>}/>

                <Route exact path="/parents" 
                  component={(props) => <ParentsPage 
                  userId={this.props.userId}
                  role={this.props.role}
                  username={this.props.username}
                  password={this.props.password}/>}/>

                <Route exact path="/admins" 
                  component={(props) => <AdminTable 
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

                <Route exact path="/class" 
                  component={(props) => <ClassPage 
                  userId={this.props.userId}
                  role={this.props.role}
                  username={this.props.username}
                  password={this.props.password}/>}/>

                <Route exact path="/department" 
                  component={(props) => <DepartmentPage 
                  userId={this.props.userId}
                  role={this.props.role}
                  username={this.props.username}
                  password={this.props.password}/>}/>

                <Route exact path="/profil" 
                component={(props) => <ProfilPage 
                userId={this.props.userId}
                role={this.props.role}
                username={this.props.username}
                password={this.props.password}/>}/>

          <Switch/>          
          </div>
          </div>
          </BrowserRouter>
          </div>
        )
      }
    }
export default AdminPage;