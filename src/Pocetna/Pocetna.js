import React, { Component } from 'react';
import Login from './Login'
import '../Pocetna/Pocetna.css'

class Pocetna extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            password: '',
            role: '',
            isLoggedIn: false,
            isError: false
        }
    }

    handleLoginChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleReset = () => {
        this.setState({
            username: '',
            password: ''
        })
        alert('Please, enter again username and password')
    }

    handleLoginSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:8095/dnevnik/login', {
            method: 'GET',
            headers:{
                'Authorization': 'Basic ' + window.btoa(this.state.username + ":" + this.state.password),
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if (response.ok) {
            const user = await response.json();
            this.props.onLogin({
                userId: user.USER_ID, 
                role: user.role, 
                isLoggedIn: true,
                username: this.state.username,
                password: this.state.password
            })
            if (user.role === 'ROLE_ADMIN') {
                this.props.history.push({
                pathname:'/admin'
            })
        }
            else if (user.role === 'ROLE_TEACHER') {
                this.props.history.push('/teacher')
            }
            else if (user.role === 'ROLE_STUDENT') {
                this.props.history.push('/student')
            }
            else {
                this.props.history.push('/parent')
            }
        } else {
            this.setState({
                isError: true
            })
        }
    }
    render() {
        return (
            <div className='login'>
                <Login
                    userId={this.state.userId}
                    username={this.state.username}
                    password={this.state.password}
                    role={this.state.role}
                    onLoginChange={this.handleLoginChange}
                    onReset={this.handleReset}
                    onLoginSubmit={this.handleLoginSubmit}
                />
            </div>
        )
    }        
}
export default Pocetna;
