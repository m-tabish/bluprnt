/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/supabase/authContext';
import { Outlet } from 'react-router-dom';
function ProtectedLayout
    () {


    const { userLoggedIn, authLoading } = useAuth();


    if (authLoading) {
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
