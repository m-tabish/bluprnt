/* eslint-disable react/prop-types */
import { useAuth } from '@/firebase/authContext';
import { Navigate, Outlet } from 'react-router-dom';



function ProtectedLayout
    () {

    
    // const { userLoggedIn, loading } = useAuth();


    // if (loading) {
    //     return <div>Loading...</div>
    // }

    // if (!userLoggedIn) {
    //     return <Navigate to="/login" replace />
    // }


    // return <Outlet />;
    return <Navigate to="/waitlist" replace />
}

export default ProtectedLayout
