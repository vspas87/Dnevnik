import React, {Component} from 'react'
import '../Students/Student.css'
import {NavLink, Link} from 'react-router-dom'
import {BrowserRouter,Route, Redirect, Switch} from 'react-router-dom'
import ProfilPage from '../Pages/ProfilPage'
import MarkPage from '../Marks/MarkPage';


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
           <BrowserRouter>
            <div>
              
              <h2>Welcome to STUDENT page of "Elektronski Dnevnik"!</h2>
              <h5>Your options:</h5>
                <Link className='button' to="/profil">Profil</Link><br />
                <Link className='button' to="/mark">Marks</Link><br/>
              <Switch/>
                <Route exact path="/profil" component={ProfilPage}/>
                <Route exact path="/mark" component={MarkPage}/>
              <Switch />
              <button onClick={this.handleLogout} className='button'>Sign out</button>< br/>
              <button onClick={this.handleGoBack} className="button">Back</button>
            </div>
          </BrowserRouter>
            )
          }
    }
export default StudentPage;