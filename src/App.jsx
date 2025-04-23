import React from 'react';
import FeaturesSection from './components/FearuresSection';
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import EsewaPaymentForm from './components/payemts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Restaurants from './components/Restaurants';
import Login from './components/LoginPage';
import SignUp from './components/Signup';
import { UserProvider } from './components/userContext';
import Menu from './components/Menu';
import UserProfile from './components/profile';
import ContactPage from './components/Contact';
import AboutPage from './components/About';
import UserBooking from './components/Booking';
import Order from './components/Orders';


function App() {
  return (
    <BrowserRouter>
      <UserProvider>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/reservation" element={<ReservationSection />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/header" element={<Header />} />
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path="/payment" element={<EsewaPaymentForm />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/my-booking' element={<UserBooking />} />
          <Route path='/orders' element={<Order />} />






        </Routes>


      </UserProvider>
    </BrowserRouter>

  );
}

export default App;
