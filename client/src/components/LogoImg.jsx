import React from 'react'


const LogoImg = () => {
  return (
    <div className='text-center'>
      <img 
      className='w-35 mx-auto'
      src="/logo.svg" alt="BugLogo" />
      <p className='fw-bolder'>Defect<span className='text-danger'>Detect</span></p>
    </div>
  )
}

export default LogoImg