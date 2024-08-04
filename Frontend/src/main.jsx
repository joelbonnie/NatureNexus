import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Entity } from './pages/Entity.jsx';
import { Entities } from './pages/Entities.jsx';
import { Statistics } from './pages/Statistics.jsx';
import { GroupBy } from './pages/GroupBy.jsx';
import { Having } from './pages/Having.jsx';
import { Nested } from './pages/Nested.jsx';
import { Division } from './pages/Division.jsx';
import { NatureForm } from './pages/NatureForm.jsx';
import { AddEntity } from './pages/AddEntity.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/form',
        element: <NatureForm />,
    },
    {
        path: '/entity/:entityName/addEntity',
        element: <AddEntity />, // Page to add an entity
    },
    {
        path: '/entity/:entityName/',
        element: <Entities />, // Entity page (list of a specific entity)
    },
    {
        path: '/entity/:entityName/:id',
        element: <Entity />, // Specific entity instance page
    },
    {
        path: '/statistics/',
        element: <Statistics />, // Statistics page (list of a statistics)
    },
    {
        path: '/statistics/animalHealth',
        element: <GroupBy />, // Page for GroupBy Query
    },
    {
        path: '/statistics/animalSpecies',
        element: <Having />, // Page for Having Query
    },
    {
        path: '/statistics/avgHabitat',
        element: <Nested />, // Page for Nested Aggregation Query
    },
    {
        path: '/statistics/plantSpecies',
        element: <Division />, // Page for Division Query
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
