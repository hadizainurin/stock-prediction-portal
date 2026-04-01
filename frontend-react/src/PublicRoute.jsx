import {useContext} from 'react'
import {AuthContext} from './AuthProvider'
import {Navigate} from 'react-router-dom'

// If can't logged in only then it can go to login page, if already logged in then it will navigate to dashboard
const PublicRoute = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext)
  return !isLoggedIn ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  )
}

export default PublicRoute