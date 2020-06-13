import React, { Component } from 'react'
import { connect } from 'react-redux'

import { authUser, logout } from '../store/actions'
import { store } from '../store'

class Authentication extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const { username, password } = this.state
        const {authUser,  authType } = this.props

        authUser(authType || 'login', { username, password })

    }

    render(){

        const { username, password } = this.state

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label for="username">Username</label>
                    <input 
                        type="text" 
                        name="username"
                        value={username} 
                        onChange={this.handleChange}
                    />

                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        value={password} 
                        onChange={this.handleChange}
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{}
}

const mapDispatchToProps = {
    authUser, 
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)