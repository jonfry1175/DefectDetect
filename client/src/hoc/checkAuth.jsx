import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const IsAuth = (WrappedComponent) => {
    const authHoc = (props) => {
        const auth = useSelector(state => state.auth) 
        if (!auth.authData) {
            return <Navigate to="/login" />
        }
        return <WrappedComponent {...props} />
    }

    return authHoc
}

const NotAuth = (WrappedComponent) => {
    const authHoc = (props) => {
        const auth = useSelector(state => state.auth) 
        const location = useLocation()
        if (auth.authData) {
            // mengembalikan ke navigasi sebelumnya
            return <Navigate to={location.state?.from || "/dashboard"} />
        }

        return <WrappedComponent {...props} />
    }

    return authHoc
}


export { IsAuth, NotAuth }