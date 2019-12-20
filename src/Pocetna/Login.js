import React, { Component } from 'react'
import Logo from '../Pocetna/esdnevniklogo.png'

class Login extends Component {
    render() {
        return (
            <div>
            <img src={Logo} className="logo" alt="Logo Elektronskog Dnevnik"/>
                      <h2 className="naslov">Welcome to 'Elektronski dnevnik'</h2>
                      <br/>
                  <div className="box" name="formlogin">
                    <label htmlFor='username'><b><i>Username</i></b></label>
                    < br/>
                      <input 
                        type="text" 
                        name="username"
                        placeholder="Username"
                        value={this.props.username} 
                        onChange={this.props.onLoginChange} 
                        required />
                        < br/>
                  <label htmlFor='password'><b><i>Password</i></b></label>
                  <br />
                      <input 
                        type="password" 
                        name="password"
                        placeholder="Enter password"
                        value={this.props.password} 
                        onChange={this.props.onLoginChange}
                        required />
                  <br/>
                    <button 
                        className="button"
                        value="Log In" 
                        className="Log In" 
                        onClick={this.props.onLoginSubmit}>Log In</button>                    
                    <button className="reset"
                        type="reset"
                        value="Reset" 
                        onClick={this.props.onReset}>Reset</button>
                        </div>
                  < br/>< br/> <br />< br/>< br/>< br/><br/>
                  <br /> <br />< br/> <br />< br/><br/>
                  <div className="footer">
                  <b>Elektronski Dnevnik was made to follow progress of elementary school students.<br/>
                  This project is a result of course <a href="https://itobuke.rs/rs" target="_blank"><b>"IT Prekvalifikacija"</b></a>
                  which was realised thanks to Republic of Serbia, following education program of <a href="https://vojvodinaictcluster.org/" target="_blank"> 
                  <b>ICT Cluster Vojvodina.</b></a>
                  </b></div>
                  </div>
          )
        }
      }
      export default Login;
      