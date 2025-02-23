import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../../Redux/Feature/alertSlice'
import axios from 'axios'
import { setUser } from '../../Redux/Feature/auth/authSlice'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading())
      const { data } = await axios.post(
        '/api/v1/user/getUser',
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      dispatch(hideLoading())
      if (data.success) {
        dispatch(setUser(data.data))
      } else {
        localStorage.clear()
      }
    } catch (error) {
      localStorage.clear()
      dispatch(hideLoading())
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [dispatch]) // Add dependencies

  useEffect(() => {
    if (!user) {
      getUser()
    } else {
      setLoading(false)
    }
  }, [user, getUser]) // Include getUser to remove warning

  if (loading) return <h1>Loading...</h1>

  return localStorage.getItem('token') ? children : <Navigate to='/login' />
}

export default PrivateRoute
