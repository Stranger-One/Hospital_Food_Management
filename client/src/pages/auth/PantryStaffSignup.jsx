import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Paper, Typography, Box, Grid, MenuItem } from '@mui/material'
import { RestaurantMenuOutlined } from '@mui/icons-material'
import { setUserData } from '../../store/authSlice'
import axios from 'axios'
import { BtnLoader } from '../../components'

const PantryStaffSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // console.log("formData", formData)

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contactInfo: formData.phone
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/pantry-staff/register`, data)
      // console.log("response", response.data);

      sessionStorage.setItem("token", JSON.stringify(response.data.token))
      dispatch(setUserData(response.data.data))

    } catch (error) {
      console.error('Signup failed:', error)
    }

    setLoading(false)
  }

  return (
    <Paper elevation={3} className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
          <RestaurantMenuOutlined className="text-white" />
        </div>
        <Typography component="h1" variant="h5" className="text-gray-900">
          Register as Pantry Staff
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700 py-3 mt-6"
        >
          {loading ? <BtnLoader /> : "Register"}
        </Button>

        <Box className="text-center mt-4">
          <Typography variant="body2" className="text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/auth/login')}
              className="text-blue-600 cursor-pointer hover:text-blue-800"
            >
              Sign in
            </span>
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Register for {' '}
            <span
              onClick={() => navigate('/auth/personnel-signup')}
              className="text-blue-600 cursor-pointer hover:text-blue-800"
            >
              delivery personnel
            </span>
          </Typography>
        </Box>
      </form>
    </Paper>
  )
}

export default PantryStaffSignup