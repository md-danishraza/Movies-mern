import React from "react";
import HomeLayout from "./pages/HomeLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import AuthLayout from "./pages/auth/AuthLayout.jsx";
import Profile from "./pages/user/Profile.jsx";
import GenreList from "./pages/admin/GenreList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <AuthLayout>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/movies/genre",
        element: (
          <AuthLayout forAdmin={true}>
            <GenreList />
          </AuthLayout>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
