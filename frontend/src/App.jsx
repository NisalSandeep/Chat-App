import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageLoader from "./components/PageLoader";

import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <div className="relative flex min-h-screen items-stretch justify-stretch overflow-hidden bg-slate-900 p-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-sky-700 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-sky-500 opacity-20 blur-[100px] " />

      <div className="relative z-10 h-full w-full">
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      </div>

      <Toaster />
    </div>
  );
};

export default App;
