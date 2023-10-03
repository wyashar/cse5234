import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const ShippingEntry = () => {
    const order = useLocation().state.order
    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: ""
    });

    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate(
            '/purchase/paymentEntry',
            {replace: true, state:{shippingInfo: shippingInfo, order: order}}
        )
    }

    let title = "Shipping Entry Page"
    return (
        <div className="container">
          <h4>{title}</h4>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    required
                    value={shippingInfo.name}
                    onChange={(e) => {
                      const updatedShippingInfo = { ...shippingInfo };
                      updatedShippingInfo.name = e.target.value;
                      setShippingInfo(updatedShippingInfo);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address1">Address Line 1:</label>
                  <input
                    type="text"
                    id="address1"
                    className="form-control"
                    required
                    value={shippingInfo.address1}
                    onChange={(e) => {
                      const updatedShippingInfo = { ...shippingInfo };
                      updatedShippingInfo.address1 = e.target.value;
                      setShippingInfo(updatedShippingInfo);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address2">Address Line 2:</label>
                  <input
                    type="text"
                    id="address2"
                    className="form-control"
                    value={shippingInfo.address2}
                    onChange={(e) => {
                      const updatedShippingInfo = { ...shippingInfo };
                      updatedShippingInfo.address2 = e.target.value;
                      setShippingInfo(updatedShippingInfo);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    className="form-control"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => {
                      const updatedShippingInfo = { ...shippingInfo };
                      updatedShippingInfo.city = e.target.value;
                      setShippingInfo(updatedShippingInfo);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    className="form-control"
                    required
                    value={shippingInfo.state}
                    onChange={(e) => {
                      const updatedShippingInfo = { ...shippingInfo };
                      updatedShippingInfo.state = e.target.value;
                      setShippingInfo(updatedShippingInfo);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zip">Zip Code:</label>
                  <input
                    type="text"
                    id="zip"
                    className="form-control"
                    required
                    value={shippingInfo.zip}
                    onChange={(e) => {
                      const updatedShippingInfo = { ...shippingInfo };
                      updatedShippingInfo.zip = e.target.value;
                      setShippingInfo(updatedShippingInfo);
                    }}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
          </form>
        </div>
      );

}

export default ShippingEntry
