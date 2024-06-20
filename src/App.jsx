import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import GroupManagement from "./pages/GroupManagement.jsx";
import TaskManagement from "./pages/TaskManagement.jsx";
import FileManagement from "./pages/FileManagement.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/group-management" element={<GroupManagement />} />
        <Route exact path="/task-management" element={<TaskManagement />} />
        <Route exact path="/file-management" element={<FileManagement />} />
      </Routes>
    </Router>
  );
}

export default App;