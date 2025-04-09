import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import Home from "./components/HomePage";
import LocationMap from "./components/sosemergency";
import Assessment from "./components/AssessmentPage";
import ChatbotSupport from "./components/ChatbotSupport";
import VideoRecommendations from "./components/Videorecommend";
import MoodTracker from "./components/Moodtracker"
import NewsFeed from "./components/News";
import TaskDashboard from "./components/Tasks"
// Define ProtectedRoute inside App.jsx
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <Outlet /> : <Navigate to="/register" />;
};

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/chatbot" element={<ChatbotSupport />} />
      <Route path="/videos" element={<VideoRecommendations />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/sos" element={<LocationMap />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/Tasks" element={<TaskDashboard />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
