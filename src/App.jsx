import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Journal from "./pages/journal/Journal";
import News from "./pages/news/News";
import EmotionTree from "./pages/emotionTree/EmotionTree";
import CalendarPage from "./pages/calendar/CalendarPage";
import Articles from "./pages/articles/Articles";
import ArticleDetail from "./pages/articles/ArticleDetail";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/myGigs", element: <MyGigs /> },
        { path: "/orders", element: <Orders /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/add", element: <Add /> },
        { path: "/journal", element: <Journal /> },           // For new entry
        { path: "/journal/:date", element: <Journal /> },     // 👈 For editing specific date
        { path: "/gig/:id", element: <Gig /> },
        { path: "/news", element: <News /> },
        { path: "/emotionTree", element: <EmotionTree /> },
        { path: "/calendar", element: <CalendarPage /> },
        { path: "/articles", element: <Articles /> },
        { path: "/articles/:id", element: <ArticleDetail /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
