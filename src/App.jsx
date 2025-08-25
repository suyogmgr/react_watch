import React from 'react';
import Navbar from './components/Navbar';
import {HashRouter, BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './components/Footer';
import About_Us from "./Pages/About_Us";
import Product from './Pages/Product';

const App = () => {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About_Us' element={<About_Us />} />
          <Route path='/Product' element={<Product />}/>
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App