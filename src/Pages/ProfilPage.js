import React, {Component} from 'react'
import '../Pages/profile.jpg'
import { isProperty } from '@babel/types'
import '../Pages/Profile.css'


const ProfilPage = (props) =>  {
        return(
            <div>
                <h3 className="profilenaslov">Welcome to your login profile:</h3>
                <table className="profileborder">
                        <tr>
                            <td>Username</td>
                            <td>{props.username}</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>{props.password}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>{props.role}</td>
                        </tr> 
                        <tr>
                            <td>Your ID for search</td> 
                            <td>{props.userId}</td>
                        </tr>
                </table>
            </div>   
        )
    }
export default ProfilPage;