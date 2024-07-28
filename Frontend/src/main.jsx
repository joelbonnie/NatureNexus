import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Entity } from './pages/Entity.jsx';
import { Entities } from './pages/Entities.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/:entityName/',
        element: <Entities />, // Entity page (list of a specific entity)
    },
    {
        path: '/:entityName/:id',
        element: <Entity />, // specific entity instance page
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
