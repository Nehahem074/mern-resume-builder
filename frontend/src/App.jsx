import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import CreateResume from "./pages/CreateResume";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyResumes from "./pages/MyResumes";
import ViewResume from "./pages/ViewResume";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EditResume from "./pages/EditResume";













function App() {

  return (

    <>

      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />



          <Route
            path="/create-resume"
            element={
              <ProtectedRoute>
                <CreateResume />
              </ProtectedRoute>
            }
          />



          <Route
            path="/my-resumes"
            element={
              <ProtectedRoute>
                <MyResumes />
              </ProtectedRoute>
            }
          />



          <Route
            path="/resume/:id"
            element={
              <ProtectedRoute>
                <ViewResume />
              </ProtectedRoute>
            }
          />



          <Route
            path="/edit-resume/:id"
            element={
              <ProtectedRoute>
                <EditResume />
              </ProtectedRoute>
            }
          />

        </Routes>



        <ToastContainer />

      </BrowserRouter>

    </>

  );
}

export default App;