import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ImageGalleryApp from "./pages/Image";
import HomePage from "./pages/HomePage"; // ✅ Replace with actual path if different
import GalleryPage from "./pages/Gallery";


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<ImageGalleryApp />} />
          <Route path="/gallery" element={<GalleryPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
