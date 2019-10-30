import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'

export default ({renderComponent, isLoggedIn,isAuthorized, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {(props) => (isLoggedIn && isAuthorized) ? 
                (
                    renderComponent(props) 
                    ) :  (
                    <Redirect to = {{
                    pathname: '/login',
                    state: {from: props.location}
                }} />
            )
        }
        />
    )
}
