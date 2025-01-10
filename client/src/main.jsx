import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import store from './store/store'
import App from './App'
import { AuthLayout, DeliveryPLayout, DeliveryPSignup, Login, ManagerDashboard, ManagerLayout, ManagerSignup, PageNotFound, PantryLayout, PantryStaffSignup, RedirectIndex } from './pages'
import AuthProtector from './pages/auth/AuthProtector'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <AuthProtector><RedirectIndex /></AuthProtector>,
      },
      {
        path: 'auth',
        element: <AuthProtector><AuthLayout /></AuthProtector>,
        children: [
          {
            path: 'login',
            element: <Login />,
          }, 
          {
            path: 'manager-signup',
            element: <ManagerSignup/>
          },
          {
            path: 'pantry-signup',
            element: <PantryStaffSignup/>
          },
          {
            path: 'personnel-signup',
            element: <DeliveryPSignup/>
          }
        ]
      },
      {
        path: 'manager',
        element: <AuthProtector><ManagerLayout /></AuthProtector>,
      },
      {
        path: 'pantry',
        element: <AuthProtector><PantryLayout/></AuthProtector>
      },
      {
        path: 'delivery',
        element: <AuthProtector><DeliveryPLayout/></AuthProtector>
      },
      {
        path: '*',
        element: <AuthProtector><PageNotFound/></AuthProtector>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
