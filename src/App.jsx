import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeHero from "./pages/HomePage"; 
import Header from "./components/common/Header";
import NeonLoader from "./components/common/Loader";   // <-- import loader
import { useEffect, useState } from "react";
import "./App.css";
import AboutPage from "./pages/AboutPage";
import JobSeekersPage from "./pages/JobsSeekerPage";
import RecruitersPage from "./pages/RecruiterPage";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show loader for exactly 5 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000"
      }}>
        <NeonLoader size={300} rings={15} />
      </div>
    );
  }

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomeHero />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/job-seekers" element={<JobSeekersPage />} />
        <Route path="/recruiters" element={<RecruitersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
