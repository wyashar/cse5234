import React from "react";

const Home = () => {
  
  return (
    <div className="container">
        <h1>CSE 5123 LLC.</h1>
        <p>Your one-stop shop for tech</p>
      <div className="row">
        <div className="col-md-4">
          <h3>Mission and Vision</h3>
          <p>It is our mission to allow people to stay up to date by supplying them with the latest tech.</p>
          <p>It is our vision to be the #1 tech provider for everybody in the world.</p>
        </div>
        <div className="col-md-4">
            <h3>Business Strategy</h3>
            <p>We ensure that the tech we supply is the latest and greatest. We sell all tech at a competitive price.</p>
        </div>
        <div className="col-md-4">
          <h3>Message for Customers</h3>
          <p>We appreciate your choice to buy from us. We will be here now and in the future for all of your tech needs.</p>
        </div>
      </div>
    </div>
  );
};
  
export default Home;