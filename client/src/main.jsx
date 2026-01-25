import DagreMap from "@/components/Dagre-Map.jsx"
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedLayout from './components/ProtectedLayout.jsx'
import { AuthProvider } from './firebase/authContext/index.jsx'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import Error404 from './pages/Error404.jsx'
import Landing from './pages/Landing.jsx'
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import Waitlist from './pages/Waitlist.jsx'
import store from './store/store.js'
const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <LoginPage />,
        },
        {
            path: "/waitlist/*",
            element: <Waitlist />
        },

        {
            path: "/login",
            // element: <App />
            element: <LoginPage />
        },

        {
            path: "/signup",
            // element: <App />
            element: <SignupPage />
        },
        {
            path: "landing",
            element: <Landing />
        },

        // Protected Routes with Layout
        {
            path: "/app",
            element: <ProtectedLayout />,
            children: [


                {
                    path: "",
                    element: <Dashboard />
                },
                {
                    path: "map/:id",
                    element: <DagreMap />
                },
                // {
                //     path: "map/:id",
                //     element: <ShowMap/>
                // }
            ]
        },
        {
            path: "/*",
            element: <Error404 />
        }


    ]
)


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </Provider>,
)
