import React, { useState } from "react"
import { useNavigate, useLocation, json } from "react-router-dom"

const PaymentEntry = () => {
    const location = useLocation()
    const order = location.state.order
    const shippingInfo = location.state.shippingInfo
    const[paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        cardExp: "",
        cardCVV: "",
        cardHolderName: ""
    })

    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(
            '/purchase/viewOrder',
            {
                replace: true,
                state: {
                    shippingInfo: shippingInfo,
                    order: order,
                    paymentInfo: paymentInfo
                }
            }
        )
    }

    let title = "Payment Entry Page"
    return (
        <div className="container">
          <h1>{title}</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="cardHolderName">Name on Card:</label>
                  <input
                    type="text"
                    id="cardHolderName"
                    className="form-control"
                    required
                    value={paymentInfo.cardHolderName}
                    onChange={(e) => {
                      const updatedPaymentInfo = { ...paymentInfo };
                      updatedPaymentInfo.cardHolderName = e.target.value;
                      setPaymentInfo(updatedPaymentInfo);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number:</label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="form-control"
                    required
                    value={paymentInfo.cardNumber}
                    onChange={(e) => {
                      const updatedPaymentInfo = { ...paymentInfo };
                      updatedPaymentInfo.cardNumber = e.target.value;
                      setPaymentInfo(updatedPaymentInfo);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="cardExp">Card Expiration Date:</label>
                  <input
                    type="text"
                    id="cardExp"
                    className="form-control"
                    required
                    value={paymentInfo.cardExp}
                    onChange={(e) => {
                      const updatedPaymentInfo = { ...paymentInfo };
                      updatedPaymentInfo.cardExp = e.target.value;
                      setPaymentInfo(updatedPaymentInfo);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardCVV">Card Verification Number:</label>
                  <input
                    type="text"
                    id="cardCVV"
                    className="form-control"
                    required
                    value={paymentInfo.cardCVV}
                    onChange={(e) => {
                      const updatedPaymentInfo = { ...paymentInfo };
                      updatedPaymentInfo.cardCVV = e.target.value;
                      setPaymentInfo(updatedPaymentInfo);
                    }}
                  />
                </div>
              </div>
            </div>
            <button type='submit' className='btn btn-outline-primary'>Submit</button>
          </form>
        </div>
      )
}

export default PaymentEntry
