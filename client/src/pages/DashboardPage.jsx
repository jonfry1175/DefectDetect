import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/authActions'
import checkAuth from '../hoc/checkAuth'

const DashboardPage = () => {
  const dispatch = useDispatch()
    const reduxData = useSelector(state => state)
    const role =  localStorage.getItem("roleId")
    const QA_ID = import.meta.env.VITE_QA_ROLE_ID
    const DEV_ID = import.meta.env.VITE_DEV_ROLE_ID
    const matchQA = role === QA_ID
    const matchDev = role === DEV_ID

    const checkRedux = () => {
        console.log(reduxData)
    }
    const logOut = () => {
        dispatch(logout())  
    }
    const checkRole = () => {
        console.log( matchQA,matchDev)
        // console.log(typeof role)
        // console.log(role)
        // console.log(typeof QA_ID)
    }
  return (
    <div>
        <button onClick={checkRedux}>Check Redux</button>
        <button onClick={checkRole}>Check Role</button> 
        <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default checkAuth(DashboardPage)