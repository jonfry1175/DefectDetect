import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/authActions'
import checkAuth from '../hoc/checkAuth'

const DashboardPage = () => {
  const dispatch = useDispatch()
    const reduxData = useSelector(state => state)
    const checkRedux = () => {
    console.log(reduxData)
    }
    const logOut = () => {
        dispatch(logout())  
    }
  return (
    <div>
        <button onClick={checkRedux}>Check Redux</button>
        <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default checkAuth(DashboardPage)