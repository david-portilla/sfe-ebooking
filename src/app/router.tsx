import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage';
import { UserDetailPage } from '../pages/UserDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UsersPage />,
  },
  {
    path: '/users/:userId',
    element: <UserDetailPage />,
  },
]);

/**
 * The main router provider for the application.
 */
export function AppRouter() {
  return <RouterProvider router={router} />;
}
