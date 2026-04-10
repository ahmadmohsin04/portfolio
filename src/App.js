import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlmushtarakaDetail from './pages/AlmushtarakaDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/almushtaraka" element={<AlmushtarakaDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
