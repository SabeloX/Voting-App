import React from 'react'
import { Provider } from 'react-redux'
import decode from 'jwt-decode' // to decode the jwt

import {store} from '../store'
import { setCurrentUser, setToken, addError, removeError } from '../store/actions'
import Authentication from '../components/Authentication'

if(localStorage.jwtToken){
    setToken(localStorage.jwtToken)
    try{
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)))
        SourceBuffer.dispatch(removeError())
    }
    catch(error){
        store.dispatch(setCurrentUser({}))
        store.dispatch(addError())
    }
}

const App = () =>(
    <Provider store={store}>
        <div>
            <h1>Voting App</h1>
            <hr/>
            <h2>Login</h2>
            <Authentication authType={'login'}/>
        </div>
    </Provider>
)

export default App