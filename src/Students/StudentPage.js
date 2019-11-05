import React, {Component} from 'react'
import '../Students/Student.css'
import {NavLink, Link} from 'react-router-dom'
import {BrowserRouter,Route, Redirect, Switch} from 'react-router-dom'
import MarkPage from '../Marks/MarkPage';
import ProfilPage from '../Pages/ProfilPage'
import ProfilStudent from '../Students/ProfilStudent'

class StudentPage extends Component {
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
        alert('In few moments, you will be log out!')
    };

    render() {
          const {navigate}= this.state;
          if(navigate) {
          return <Redirect to='/login' push={true} />;
          }
          return (
              <div>
              <BrowserRouter>
              <div className="studentnavigation">
                  <div className="studentruter">
                  <h2>Welcome to STUDENT page of 'Elektronski Dnevnik!'</h2></div>
                  <div className="studentoption">
                  <p>For more information, please choose from following options:</p></div>
                  <button className='buttonTop' onClick={this.handleLogout}>Log off</button>
                  <button className='buttonTop' onClick={this.handleGoBack}>Go Back</button>
                  <div className="ca ct">
                  <NavLink className='button' to="/profil">Profil</NavLink></div>
                  <div className="da ct">
                  <NavLink className='button' to="/mark">Marks</NavLink></div>
              <div className="ia ct">  
              <Switch/>
                <Route exact path="/profil" 
                  component={(props) => <ProfilStudent
                  userId={this.props.userId}
                  role={this.props.role}
                  username={this.props.username}
                  password={this.props.password}/>}/>
                <Route exact path="/mark" 
                  component={(props) => <MarkPage
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
export default StudentPage;