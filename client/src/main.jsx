
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import DagreMap from "./components/Dagre-Map.jsx"
import { LoginForm } from './components/login-form.jsx'
import ProtectedLayout from './components/ProtectedLayout.jsx'
import { AuthProvider } from './firebase/authContext/index.jsx'
import './index.css'
import Error404 from './pages/Error404.jsx'
import Landing from './pages/Landing.jsx'
import Signup from './pages/Signup.jsx'
import Waitlist from './pages/Waitlist.jsx'
import store from './store/store.js'

const router = createBrowserRouter(
  [


    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/waitlist/*",
      element: <Waitlist />
    },

    {
      path: "/login",
      // element: <App />
      element: <LoginForm />
    },

    {
      path: "/signup",
      // element: <App />
      element: <Signup />
    },

    // Protected Routes with Layout
    {
      path: "/app",
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <App />
        },

        {
          path: "map/:id",
          element: <DagreMap />
        }
      ]
    },
    {
      path: "*",
      element: <Error404 />
    }


  ]
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>,
)
