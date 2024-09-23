import { StrictMode } from "react";
import { Provider, useSelector } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import store from "./store";
import { ChatPage } from "./pages/ChatPage";

// Protected route wrapper that uses the `useSelector` hook inside the component
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn); // Get the loggedIn status from Redux

  return isLoggedIn ? children : <Navigate to="/auth?fn=login" />;
};

// Define the router with protected routes
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/chat" />, // Default path redirects to ChatPage, which is protected
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
