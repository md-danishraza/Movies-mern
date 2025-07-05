import React from "react";
import HomeLayout from "./pages/HomeLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import AuthLayout from "./pages/auth/AuthLayout.jsx";
import Profile from "./pages/user/Profile.jsx";
import GenreList from "./pages/admin/GenreList.jsx";
import CreateMovie from "./pages/admin/CreateMovie.jsx";
import MovieList from "./pages/admin/MovieList.jsx";
import UpdateMovie from "./pages/admin/UpdateMovie.jsx";
import AllMovies from "./pages/movies/AllMovies.jsx";
import MovieDetail from "./pages/movies/MovieDetail.jsx";
import AllComments from "./pages/admin/AllComments.jsx";
import DashBoard from "./pages/admin/DashBoard.jsx";

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
        path: "/movies",
        element: <AllMovies />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetail />,
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
        path: "/admin/movies/dashboard",
        element: (
          <AuthLayout forAdmin={true}>
            <DashBoard />
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
      {
        path: "/admin/movies/create",
        element: (
          <AuthLayout forAdmin={true}>
            <CreateMovie />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/movies/list",
        element: (
          <AuthLayout forAdmin={true}>
            <MovieList />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/movies/comments",
        element: (
          <AuthLayout forAdmin={true}>
            <AllComments />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/movies/update/:id",
        element: (
          <AuthLayout forAdmin={true}>
            <UpdateMovie />
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
