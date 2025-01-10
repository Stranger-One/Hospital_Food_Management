import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Paper, Typography, Box, Grid } from '@mui/material'
import { PersonAddOutlined } from '@mui/icons-material'
import { setUserData } from '../../store/authSlice'

const ManagerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    hospitalName: '',
    address: ''
  })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.hospitalName) newErrors.hospitalName = 'Hospital name is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      // Add your API call here
      // For now, just mock the signup
      dispatch(setUserData({
        id: '123',
        name: formData.name,
        email: formData.email,
        role: 'Food Manager'
      }))
      navigate('/manager')
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  return (
    <Paper elevation={3} className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
          <PersonAddOutlined className="text-white" />
        </div>
        <Typography component="h1" variant="h5" className="text-gray-900">
          Create Manager Account
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
              error={!!errors.name}
              helperText={errors.name}
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
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
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
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700 py-3 mt-6"
        >
          Create Account
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
        </Box>
      </form>
    </Paper>
  )
}

export default ManagerSignup