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

  
  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.SERVER_BASE_URL}/api/common/check-auth`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
          }
        })
        if(response.data.success){
          dispatch(setUserData(response.data.data))
        } else {
          dispatch(setUserData(null))
        }
      } catch (error) {
        console.error(error);
        dispatch(setUserData(null))
      }
      setLoading(false)
    };
    
    getAuth()
  }, [dispatch])
  


  useEffect(() => {
    if (!userData && !location.pathname.includes("/auth")) {
      navigate("/auth/login")
    } else if (userData && !location.pathname.includes("/auth")) {
      if (userData.role === "Food Manager" && !location.pathname.includes("/manager")) {
        navigate("/manager")
      } else if (userData.role === "Pantry Staff" && !location.pathname.includes("/pantry")) {
        navigate("/pantry")
      } else if (userData.role === "Delivery Personnel" && !location.pathname.includes("/delivery")) {
        navigate("/delivery")
      }
    } else if (userData && location.pathname.includes("/auth")) {
      navigate("/")
    }
    
  }, [userData, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="sticky top-0 left-0 w-full h-screen bg-gray-200 flex items-center justify-center">
        <p className='text-3xl font-semibold'>Loading...</p>
      </div>
    )
  }

  return (
    <>{children}</>
  )
}

export default AuthProtector