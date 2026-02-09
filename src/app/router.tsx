import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ComponentDemo } from '../pages/ComponentDemo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ComponentDemo />,
  },
  // We will add more routes here for users feature later
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
