import React from 'react';
import {Link} from "react-router-dom"

const Footer = () => (

  <footer className ='bg-dark text-light py-4'>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="col-md-6">
          <h4>
            <Link to="/contactus" replace>Contact Us</Link>
          </h4>
          <p>Email: CSE5234.999@osu.edu</p>
          <p>Phone: +1 (614)-602-7924</p>
        </div>
      </div>
    </div>
    <div className="text-center mt-3">
      &copy; {new Date().getFullYear()} CSE5234 LLC. All rights reserved.
    </div>
  </footer>
);

export default Footer;
