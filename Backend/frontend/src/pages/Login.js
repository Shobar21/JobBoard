import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import logo from '../imges/JobBoardLogo.webp'
import InputFrom from '../components/shared/InputForm'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../Redux/Feature/alertSlice'
import Spinner from '../components/shared/Spinner'
import { toast } from 'react-toastify'
import axios from 'axios'

function Login() {
  //states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //redux state
  const { loading } = useSelector((state) => state.alerts)

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        return alert('Please Provide All Fields')
      }
      dispatch(showLoading())
      const { data } = await axios.post('/api/v1/auth/login', {
        email,
        password,
      })
      if (data.success) {
        dispatch(hideLoading())
        localStorage.setItem('token', data.token)
        toast.success('Login SUccessfully ')
        navigate('/dashboard')
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error('Invalid Credintial please try again!')
      console.log(error)
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='form-container'>
          <Form className='card p-3' onSubmit={handleSubmit}>
            <img src={logo} alt='logo' height={150} width={400} />
            <InputFrom
              htmlFor='email'
              labelText={'Email'}
              type={'email'}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name='email'
              placeholder={'Enter Email'}
              required
            />
            <InputFrom
              htmlFor='password'
              labelText={'Password'}
              type={'password'}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name='password'
              placeholder={'Enter Password'}
            />

            <div className='d-flex justify-content-between mt-3'>
              <p>
                Register Please <Link to='/register'>Register</Link>
              </p>
              <Button variant='dark' type='submit'>
                Login
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  )
}

export default Login
