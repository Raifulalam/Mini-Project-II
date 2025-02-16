import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FearuresSection';
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import EsewaPaymentForm from './components/payemts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Restaurants from './components/Restaurants';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/features" element={<FeaturesSection />} />
        <Route path="/reservation" element={<ReservationSection />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/header" element={<Header />} />
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path="/payment" element={<EsewaPaymentForm />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
