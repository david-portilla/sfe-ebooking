import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">
          User Management Dashboard
        </h1>
        <p className="mt-4 text-gray-600">Core Architecture Setup Complete</p>
      </div>
    ),
  },
  // We will add more routes here for users feature later
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
