import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader'
import { Toaster } from 'sonner'
import { useSelector } from 'react-redux'

const HomePage = lazy(() => import('./pages/HomePage'))
const Notfound = lazy(() => import('./components/Notfound'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

const App = () => {
  const darkMode = useSelector(state => state.show.darkMode);

  useEffect(() => {
    // Set meta viewport tag to improve mobile responsiveness
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(viewportMeta);

    // Cleanup on unmount
    return () => {
      const metaTag = document.querySelector('meta[name="viewport"]');
      if (metaTag) {
        metaTag.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
      <Toaster position='top-center' />
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
  )
}

export default App
