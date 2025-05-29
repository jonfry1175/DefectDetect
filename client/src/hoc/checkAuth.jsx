import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const IsAuth = (WrappedComponent) => {
    const AuthHoc = (props) => {
        const auth = useSelector(state => state.auth)
        if (!auth.authData) {
            return <Navigate to="/login" />
        }
        return <WrappedComponent {...props} />
    }

    return AuthHoc
}

const NotAuth = (WrappedComponent) => {
    const AuthHoc = (props) => {
        const auth = useSelector(state => state.auth)
        const location = useLocation()
        if (auth.authData) {
            // mengembalikan ke navigasi sebelumnya
            return <Navigate to={location.state?.from || "/dashboard"} />
        }

        return <WrappedComponent {...props} />
    }

    return AuthHoc
}


export { IsAuth, NotAuth }