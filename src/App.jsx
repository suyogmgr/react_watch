import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App