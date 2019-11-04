import React, {Component} from 'react'
import '../Parents/Parent.css'
import {NavLink, BrowserRouter, Route, Redirect, Switch, WithRouter} from 'react-router-dom'
import MarkPage from '../Marks/MarkPage'
import ProfilPage from '../Pages/ProfilPage'
import ChildrenPage from '../Parents/ChildrenPage'

class ParentPage extends Component {
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
          return(
            <BrowserRouter>
              <div className="gridParent">
              <div className="ap ct">
                <h2>Welcome to PARENT page of "Elektronski Dnevnik!"</h2></div>
              <div className="bp ct">
                <p>For more information about your children and marks, please choose in the following options:</p></div>
              <button className="buttonTop" onClick={this.handleLogout}>Log off</button>
              <button className="buttonTop" onClick={this.handleGoBack}>Back</button>
              <div className="cp ct">
                <NavLink activeClassName="active" className="button" to="/children">Children</NavLink></div>
              <div className="ep ct">
                <NavLink activeClassName="active" className="button" to="/profil">Profil</NavLink></div>
              <div className="gp ct">
              <Switch>
                <Route 
                  exact path="/children" 
                  component={(props) => <ChildrenPage
                    userId={this.props.userId}
                    role={this.props.role}
                    username={this.props.username}
                    password={this.props.password}/>}/>
                <Route 
                  exact path="/profil" 
                  component={(props) => <ProfilPage 
                    userId={this.props.userId}
                    role={this.props.role}
                    username={this.props.username}
                    password={this.props.password}/>}/>
              </Switch>
            </div>
            </div>
          </BrowserRouter>
        )
      }
    }
export default ParentPage;