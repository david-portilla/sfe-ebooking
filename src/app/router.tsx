import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UsersPage />,
  },
  // TODO: Add more routes here for detailed user view or settings
]);

/**
 * The main router provider for the application.
 */
export function AppRouter() {
  return <RouterProvider router={router} />;
}
