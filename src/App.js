import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AlmushtarakaDetail from './pages/AlmushtarakaDetail';
import MediumDesignDetail from './pages/MediumDesignDetail';
import KomorebiDetail from './pages/KomorebiDetail';
import HabitTrackerDetail from './pages/HabitTrackerDetail';
import CryptoDetail from './pages/CryptoDetail';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/almushtaraka" element={<AlmushtarakaDetail />} />
        <Route path="/projects/medium-redesign" element={<MediumDesignDetail />} />
        <Route path="/projects/komorebi" element={<KomorebiDetail />} />
        <Route path="/projects/habit-tracker" element={<HabitTrackerDetail />} />
        <Route path="/projects/crypto-wallet" element={<CryptoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
