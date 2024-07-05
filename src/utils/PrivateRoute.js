import {Route, Redirect} from "react-router-dom"
import {Children, useContext, userContext} from "react"
import AuthContext from "../context/AuthContext"

const PrivareRoute =([Children, ...rest]) =>{
    let {user} = useContext(AuthContext)
    return<Route {...rest}>{!user ? <Redirect to="/login"/>:Children}</Route>
}

export default PrivareRoute