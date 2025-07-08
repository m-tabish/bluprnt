/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/firebase/authContext';
import { Outlet } from 'react-router-dom';
function ProtectedLayout
    () {


    const { userLoggedIn, loading } = useAuth();


    if (loading) {
        return <div>Loading...</div>
    }

    if (!userLoggedIn) {
        return <Navigate to="/login" replace />
    }


    return (<>
        <Navbar />
        <Outlet />
        <Footer></Footer>
    </>)

}

export default ProtectedLayout
