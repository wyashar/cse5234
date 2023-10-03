import React from 'react';

const ContactUs = () => {
  return (
    <div>
      <header className="bg-dark text-light text-center py-5">
        <h1>Contact Us</h1>
      </header>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <textarea className="form-control" id="message" rows="5" placeholder="Enter your message" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
