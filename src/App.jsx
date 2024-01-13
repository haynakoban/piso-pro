import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout, { mainLoader } from './layouts/MainLayout';
import { logoutAction } from './actions/logout';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Register, { registerAction } from './pages/Register';
import Login, { loginAction } from './pages/Login';
import Error from './pages/Error';
import Expenses, { expensesAction, expensesLoader } from './pages/Expenses';
import SingleBudget, {
  singleBudgetAction,
  singleBudgetLoader,
} from './pages/SingleBudget';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    loader: mainLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'expenses',
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: 'budget/:id',
        element: <SingleBudget />,
        loader: singleBudgetLoader,
        action: singleBudgetAction,
        errorElement: <Error />,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
        errorElement: <Error />,
      },
      {
        path: 'signup',
        element: <Register />,
        action: registerAction,
        errorElement: <Error />,
      },
      { path: 'logout', action: logoutAction },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
