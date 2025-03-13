import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Dashboard from './pages/Dashboard.js'
import NotFound from './pages/NotFound.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/routes/PrivateRoute.js'
import Jobs from './pages/Jobs.js'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
