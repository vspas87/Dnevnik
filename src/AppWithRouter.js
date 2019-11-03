import React, { Component } from 'react'
import {BrowserRouter, Switch, Route, Link, NavLink, history} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Pocetna from './Pocetna/Pocetna'
import AdminPage from './Admins/AdminPage'
import TeacherPage from './Teachers/TeacherPage'
import StudentPage from './Students/StudentPage'
import ParentPage from './Parents/ParentPage'
import PageNotFound from './Pages/PageNotFound'


class AppWithRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
        }
    }

    handleLogin = (user) => {
        this.setState({
            ...user
        })
    }

    render() {
        return (
            <BrowserRouter>
            <>
                <Switch>
                    <Route 
                        exact path='/login'
                        render = {(props) => 
                        <Pocetna {...props} onLogin={this.handleLogin} />} 
                    />
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_ADMIN"}
                        path='/admin'
                        renderComponent={(props) => <AdminPage {...props}
                        userId={this.state.userId}
                        role={this.state.role}
                        username={this.state.username}
                        password={this.state.password}
                    />} />
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_TEACHER"}
                        path='/teacher'
                        renderComponent={(props) => <TeacherPage {...props}
                        userId={this.state.userId}
                        role={this.state.role}
                        username={this.state.username}
                        password={this.state.password}
                    />} />
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_STUDENT"}
                        path='/student'
                        renderComponent={(props) => <StudentPage {...props}
                        userId={this.state.userId}
                        role={this.state.role}
                        username={this.state.username}
                        password={this.state.password}
                    />}/>
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_PARENT"}
                        path='/parent'
                        renderComponent={(props) => <ParentPage {...props}
                        userId={this.state.userId}
                        role={this.state.role}
                        username={this.state.username}
                        password={this.state.password}
                    />} />
                    <Route component={PageNotFound} />
                </Switch>
            </>
            </BrowserRouter>
        )
    }
}

export default AppWithRouter