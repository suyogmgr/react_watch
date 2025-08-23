import React from 'react';
import Navbar from './components/Navbar';
import {HashRouter, BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App