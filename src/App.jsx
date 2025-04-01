import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoDetail from './pages/VideoDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
// Importuj aj stránku pre kategórie, ak ju vytvoríš

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/category/:categoryName" element={<CategoryPage />} /> */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-primary-dark text-pure-white">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Stránka nenájdená</p>
            <a href="/" className="bg-primary-red text-pure-white px-6 py-3 rounded-lg hover:bg-accent-red transition duration-300">
              Späť na hlavnú stránku
            </a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App; 