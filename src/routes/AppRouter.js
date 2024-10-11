import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Whiteboard from '../pages/Whiteboard';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/whiteboard/:id' element={<Whiteboard />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;