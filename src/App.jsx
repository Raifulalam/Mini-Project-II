import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FearuresSection';
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <FeaturesSection />
      <ReservationSection />
      <Footer />
    </div>
  );
}

export default App;
