import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar'; // Ensure path is correct
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import ScrollToTop from './components/Layout/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-ingredi-bg min-h-screen flex flex-col">
        <Navbar /> {/* Navbar hamesha top par */}
        
        <div className="flex-grow"> {/* Ye div baki content ko sambhale gi */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;