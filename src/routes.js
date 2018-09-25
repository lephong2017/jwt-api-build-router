import React from 'react';
import CateListPage from 'pages/categoryManagement/CateListPage/CateListPage';
import CateActionPage from 'pages/categoryManagement/CateActionPage/CateActionPage';
import ProductListPage from './pages/productManagement/ProductListPage/ProductListPage';
import ProductActionPage from './pages/productManagement/ProductActionPage/ProductActionPage';
import AppSecurity from 'pages/pageDemo';
import OrganManagement from 'pages/organManagement/index';
import MyForm from 'components/MyForm/demo';
import Login from 'pages/page/login';
import Register from 'pages/page/register';
import Service from 'pages/servicesManagement/services';
// import AppSecurity from 'containers/App';

export const adminRoutes = [
    {
        path: '/login',
        exact: true,
        main: () => <Login />
    },
    {
        path: '/register',
        exact: true,
        main: () => <Register />
    },

    {
        path: '/organ-manager',
        exact: false,
        main: () => <OrganManagement />
    },
    {
        path: '/service',
        exact: false,
        main: () => <Service />
    },
    
];

