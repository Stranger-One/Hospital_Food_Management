import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserData } from '../../store/authSlice';

const AuthProtector = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData)
  const [loading, setLoading] = useState(true)

  // Verify token and fetch user data on mount
  useEffect(() => {
    const verifyAuth = async () => {
      const token = sessionStorage.getItem('token')

      if (!token) {
        console.log("token not found")
        navigate('/auth/login')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/common/verify-token`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`
            }
          }
        )
        dispatch(setUserData(response.data.data))
        console.log("userdata", response.data.data)
      } catch (error) {
        console.error('Token verification failed:', error)
        sessionStorage.removeItem('token')
        dispatch(setUserData(null))
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [dispatch])

  useEffect(() => {
    if (!userData) {
      navigate('/auth/login')
    } else if(userData){
      if(userData.role === "Food Manager" && !location.pathname.includes("/manager")) {
        navigate('/manager')
      } else if(userData.role === "Pantry Staff" && !location.pathname.includes("/pantry")){
        navigate('/pantry')
      } else if(userData.role === "Delivery Personnel" && !location.pathname.includes("/delivery")){
        navigate('/delivery')
      }
    }

    // setLoading(false)
  }, [userData, location.pathname])



  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return children
}

export default AuthProtector