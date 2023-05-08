import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './auth/pages/LoginPage';
import { UserRoutes } from './routes/UserRoutes';
import { useAuth } from './auth/hooks/useAuth';
export const AppRouter = ()=>{
    const { login } = useAuth();

    return (
        <Routes>
            {
                login.isAuth
                    ? (
                        <Route path='/*' element={<UserRoutes />} />
                    )
                    : <>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/*' element={<Navigate to="/login" /> } />
                    </>
                    
            }
        </Routes>
    );
}