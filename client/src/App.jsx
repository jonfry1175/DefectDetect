import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader'
import { Toaster } from 'sonner'
import { ThemeProvider } from './hooks/useTheme.jsx'

// const HomePage = lazy(() => import('./pages/HomePage'))
const Notfound = lazy(() => import('./components/Notfound'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

/**
 * Main application component
 */
const App = () => {
  return (
    <ThemeProvider>
      <Toaster position='top-center' />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* <Route path='/dashboard' element={<DashboardPage />} /> */}
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
