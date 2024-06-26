import React,{lazy, Suspense} from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader'
import {Toaster} from 'sonner'
const HomePage = lazy(() => import('./pages/HomePage'))
const Notfound = lazy(() => import('./components/Notfound'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))


const App = () => {
  return (
    <>
    <Toaster position='top-center' />
    <div className="bg-dark text-light min-vh-100">
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
      </Suspense>
    </div>
    </>
  )
}

export default App
