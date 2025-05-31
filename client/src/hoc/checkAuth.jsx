import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

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
        if (auth.authData) {
            // mengembalikan ke navigasi sebelumnya
            return <Navigate to={"/dashboard"} />
        }

        return <WrappedComponent {...props} />
    }

    return AuthHoc
}


export { IsAuth, NotAuth }