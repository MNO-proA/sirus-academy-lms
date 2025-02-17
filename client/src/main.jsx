import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth-context/index.jsx";
import InstructorProvider from "./context/instructor-context/index.jsx";
import StudentProvider from "./context/student-context/index.jsx";
import { LoadingProvider } from '@/context/loading-context';
import { Toaster } from "@/components/ui/sonner"



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <LoadingProvider>
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
        <Toaster/>
          <App />
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>
);
