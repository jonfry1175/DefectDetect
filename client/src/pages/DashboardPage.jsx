import React from 'react'
import { useSelector } from 'react-redux'

const DashboardPage = () => {
    const reduxData = useSelector(state => state)
    const checkRedux = () => {
    console.log(reduxData)
    }
  return (
    <div>
        <button onClick={checkRedux}>Check Redux</button>
    </div>
  )
}

export default DashboardPage