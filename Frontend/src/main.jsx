import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Users } from './pages/Users.jsx';
import { User } from './pages/User.jsx';

const list = [
    { name: 'Cindy', id: 0 },
    { name: 'Joel', id: 1 },
    { name: 'Aiden', id: 2 },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/users',
        element: <Users users={list} />,
    },
    {
        path: '/users/:id',
        element: <User users={list} />,
    },
    {
        path: '/:entity/',
        element: <Users users={list} />, // Entity page (list)
    },
    {
        path: '/:entity/:id',
        element: <User users={list} />, // specific instance page
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
