import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Purchase from './purchase';
import PaymentEntry from './paymentEntry';
import ShippingEntry from './shippingEntry';
import ViewOrder from './viewOrder';
import ViewConfirmation from './Confirmation';
import ContactUs from "./contactUs"
import axios from "axios";
import { useEffect } from 'react';

import Footer from "./components/footer";
import Home from './components/home';
import About from './components/about';
import Cart from './components/cart';

function App() {
  useEffect(() => {
    axios.get("http://localhost:7000/init_product_table")
      .then((response) => {
        console.log("Successfully loaded app data")
      })
      .catch((error) => {
        console.error("Error fetching initial product data:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:7000/init_orders_table")
      .then((response) => {
        console.log("Successfully loaded app data")
      })
      .catch((error) => {
        console.error("Error fetching initial order data:", error);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content bg-light">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/purchase' element={<Purchase />} />
            <Route path="/" element={<Navigate replace to="/purchase" />} />
            <Route path='/purchase/paymentEntry' element={<PaymentEntry />} />
            <Route path='/purchase/shippingEntry' element={<ShippingEntry />} />
            <Route path='/purchase/viewOrder' element={<ViewOrder />} />
            <Route path='/purchase/viewConfirmation' element={<ViewConfirmation />} />
            <Route path='/contactus' element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

