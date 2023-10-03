import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-light py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="col-md-4">
          <h4>Contact Us</h4>
          <p>Email: info@example.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
        <div className="col-md-4">
          <h4>Who Are We?</h4>
          <a href="#">Facebook</a><br />
          <a href="#">Twitter</a><br />
          <a href="#">Instagram</a>
        </div>
      </div>
    </div>
    <div className="text-center mt-3">
      &copy; {new Date().getFullYear()} CSE5234 LLC. All rights reserved.
    </div>
  </footer>
);

export default Footer;
