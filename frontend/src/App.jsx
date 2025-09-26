import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import AddAgent from "./components/AddAgent";
import AgentsList from "./pages/AgentsList";
import UploadPage from "./components/UploadPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-agent" element={<PrivateRoute><AddAgent /></PrivateRoute>} />
        <Route path="/agents" element={<PrivateRoute><AgentsList /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
