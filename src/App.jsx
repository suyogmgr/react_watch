import React from 'react';
import Navbar from './components/Navbar';
import {HashRouter, BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './components/Footer';
import About_Us from "./Pages/About_Us";
import Product from './Pages/Product';
import Checkout from "./Pages/Checkout";
import Register from "./Pages/Register";
import Login from './Pages/Login';
import AdminPanel from './Pages/AdminPanel';
const App = () => {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About_Us' element={<About_Us />} />
          <Route path='/Product' element={<Product />}/>
          <Route path='/Checkout' element={<Checkout />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App