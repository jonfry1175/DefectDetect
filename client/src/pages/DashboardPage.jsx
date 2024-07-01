import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/authActions'
import {IsAuth} from '../hoc/checkAuth'
import { Navigate, useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const reduxData = useSelector(state => state.auth)
    const roleId = reduxData.authData?.role_id
    const QA_ID = +import.meta.env.VITE_QA_ROLE_ID
    const DEV_ID = +import.meta.env.VITE_DEV_ROLE_ID
    const matchQA = roleId === QA_ID
    const matchDev = roleId === DEV_ID

    const checkRedux = () => {
        console.log(reduxData.authData)
    }
    const logOut = () => {
        dispatch(logout())  
    }
    const checkRole = () => {
        console.log( matchQA,matchDev)
        // console.log(typeof role)
        // console.log(typeof roleId)
        // console.log(typeof QA_ID)
    }
    const toLogin = () => (navigate('/login'))
    const toRegister = () => (navigate('/register'))
  return (
    <div>
        <button onClick={checkRedux}>Check Redux</button>
        <button onClick={checkRole}>Check Role</button> 
        <button onClick={logOut}>Logout</button>
        <button onClick={toLogin}>login page</button>
        <button onClick={toRegister}>register page</button>
    </div>
  )
}

export default IsAuth(DashboardPage)