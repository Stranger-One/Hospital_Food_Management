import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { LineAxisOutlined, LockOutlined } from '@mui/icons-material'
import { setUserData } from '../../store/authSlice'
import axios from 'axios'
import { BtnLoader } from '../../components'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const roles = [
    { value: 'Food Manager', label: 'Food Manager' },
    { value: 'Pantry Staff', label: 'Pantry Staff' },
    { value: 'Delivery Personnel', label: 'Delivery Personnel' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = {
      email,
      password,
      role
    }
    // console.log("formData", formData)

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/common/login`, formData)
      // console.log("resonse", response);

      sessionStorage.setItem("token", JSON.stringify(response.data.token))
      dispatch(setUserData(response.data.data))

    } catch (error) {
      console.log("failed to login:",error);
    }

    setLoading(false)

  }

  return (
    <Paper elevation={3} className="p-4">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center mb-4">
          <LockOutlined className="text-white" />
        </div>
        <Typography component="h1" variant="h5" className="text-gray-900">
          Sign in to your account
        </Typography>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormControl fullWidth required>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700 py-3"
        >
          {loading ? <BtnLoader /> : "Sign in"}
        </Button>

        <Box className="text-center mt-4">
          <Typography variant="body2" className="text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/auth/personnel-signup')}
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

export default Login