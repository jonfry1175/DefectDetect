import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const checkAuth = (WrappedComponent) => {
    const authHoc = (props) => {
        const isAuth = useSelector(state => state.auth.isAuthenticated) 
        if (!isAuth) {
            return <Navigate to="/login" />
        }
        return <WrappedComponent {...props} />
    }

    return authHoc
}

export default checkAuth