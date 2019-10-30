import React, {Component} from 'react'
import '../Pages/profile.png'


function ProfilPage (props) {
 
        return(
            <div>
                <h4>Information about your login profile:</h4>
                    Username:{props.username} <br/>
                    Password:{props.password}
                   
                   
            </div>   
        )
    }

export default ProfilPage;