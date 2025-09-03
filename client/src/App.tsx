import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Layout from './layout/layout';

import MapPage from './pages/map';
import SitePage from './pages/site';
import GroupPipePage from './pages/groupPipe';
import PipePage from './pages/pipe';
import PipePermissionPage from './pages/PipePermission';
import ManualPage from './pages/manual';
import CreateUserPage from './pages/createUser';
import ViewUserPage from './pages/viewUser';
import LoginPage from './pages/login';
import QuantityTBPage from './pages/quantityTB';
import QuantityNTPage from './pages/quantitynt';
import IndexManualPage from './pages';
import QuantityNTSXPage from './pages/quantityntsx';
import BranchPage from './pages/branch';
import BranchPermissionPage from './pages/branchPermission';
import LostBranchPage from './pages/lostBranch';

import ErrorPage from './pages/error';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <MapPage />,
                },

                {
                    path: '/site',
                    element: <SitePage />,
                },
                {
                    path: '/groupPipe',
                    element: <GroupPipePage />,
                },
                {
                    path: '/pipe',
                    element: <PipePage />,
                },
                {
                    path: '/pipePermission',
                    element: <PipePermissionPage />,
                },
                {
                    path: '/manual',
                    element: <ManualPage />,
                },
                {
                    path: '/createUser',
                    element: <CreateUserPage />,
                },
                {
                    path: '/viewUser',
                    element: <ViewUserPage />,
                },
                {
                    path: '/quantitytb',
                    element: <QuantityTBPage />,
                },
                {
                    path: '/quantitynt',
                    element: <QuantityNTPage />,
                },
                {
                    path: '/quantityntsx',
                    element: <QuantityNTSXPage />,
                },
                {
                    path: '/index',
                    element: <IndexManualPage />,
                },
                {
                    path: '/branch',
                    element: <BranchPage />,
                },
                {
                    path: '/branchPermission',
                    element: <BranchPermissionPage />,
                },
                {
                    path: '/lostbranch',
                    element: <LostBranchPage />,
                },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '*',
            element: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
