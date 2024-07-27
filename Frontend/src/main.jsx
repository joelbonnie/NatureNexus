import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Entity } from './pages/Entity.jsx';
import { Entities } from './pages/Entities.jsx';

const mockData = [
    { entity: 'animal', id: 0, species: 'cottontail rabbit', health: 'poor' },
    { entity: 'animal', id: 1, species: 'british columbia wolf', health: 'excellent'},
    { entity: 'plant', id: 0, health: 'good' },
    { entity: 'plant', id: 1, health: 'mid' },
    { entity: 'habitat', id: 0, name: 'Becker Forest' },
    { entity: 'habitat', id: 1, name: 'Peddlehead Lake' },
    { entity: 'habitat', id: 2, name: 'Becker Lake' },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/:entity/',
        element: <Entities mockEntities={mockData} />, // Entity page (list of a specific entity)
    },
    {
        path: '/:entity/:id',
        element: <Entity mockEntities={mockData} />, // specific entity instance page
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
