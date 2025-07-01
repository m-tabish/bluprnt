
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './firebase/authContext/index.jsx'
import './index.css'
import Waitlist from './pages/Waitlist.jsx'
import store from './store/store.js'

const router = createBrowserRouter(
  [


    {
      path: '/',
      element: <Waitlist />
    },
    // {
    //   path: "/error",
    //   element: <Error404 />
    // },
    // {
    //   path: "/login",
    //   // element: <App />
    //   element: <LoginForm />
    // },

    // {
    //   path: "/signup",
    //   // element: <App />
    //   element: <Signup />
    // },

    // Protected Routes

    // {
    //   path: "/",
    //   element: <ProtectedLayout />,
    //   children: [
    //     {
    //       index: true,
    //       element: <App />
    //     },



    //     {
    //       path: "dashboard/*",
    //       element: <App />
    //     },

    //     {
    //       path: "/map/:id",
    //       element: <DagreMap />
    //     },

    //   ]

    // },

  ]
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>

  </Provider>,
)
