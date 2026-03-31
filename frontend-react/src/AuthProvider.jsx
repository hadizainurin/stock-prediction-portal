import {useState, useContext, createContext} from 'react'

// Create the context
const AuthContext = createContext()

// Create a provider component
const AuthProvider = ({children}) => {
        // If there is an access token then the user is logged in and vice versa
        const [isLoggedIn, setIsLoggedIn] = useState(
            // This will convert it to true/false
            !!localStorage.getItem('accessToken')
        )
    return (
        // children is nothing but app component
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext}