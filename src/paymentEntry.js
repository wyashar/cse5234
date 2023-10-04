import React, { useState } from "react"
import { useNavigate, useLocation, json } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      <div style={{width: "600px"}} className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          { /* First Field */}
          <Form.Group className="mb-3" controlId="formCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            placeholder="999-999-9999"
            required
            type="text"
            value={paymentInfo.name}
            onChange={(e) => {
              const updatedPaymentInfo = { ... paymentInfo }
              updatedPaymentInfo.name = e.target.value
              setPaymentInfo(updatedPaymentInfo)
          }}
          />
          </Form.Group>
          { /* Second Field */}
          <Form.Group className="mb-3" controlId="formCardExp">
          <Form.Label>Card Expiration</Form.Label>
          <Form.Control
            placeholder="09/99"
            required
            type="text"
            value={paymentInfo.cardExp}
            onChange={(e) => {
              const updatedPaymentInfo = { ... paymentInfo }
              updatedPaymentInfo.cardExp = e.target.value
              setPaymentInfo(updatedPaymentInfo)
          }}
          />
          </Form.Group>
          { /* Third Field */ }
          <Form.Group className="mb-3" controlId="formCardCvv">
          <Form.Label>Card CVV</Form.Label>
          <Form.Control
            placeholder="999"
            required
            type="text"
            value={paymentInfo.cardCVV}
            onChange={(e) => {
              const updatedPaymentInfo = { ... paymentInfo }
              updatedPaymentInfo.cardCVV = e.target.value
              setPaymentInfo(updatedPaymentInfo)
          }}
          />
          </Form.Group>
          { /* Fourth Field */ }
          <Form.Group className="mb-3" controlId="formCardHolderName">
          <Form.Label>Card Holder Name</Form.Label>
          <Form.Control
            placeholder="Mark Emerson"
            required
            type="text"
            value={paymentInfo.cardHolderName}
            onChange={(e) => {
              const updatedPaymentInfo = { ... paymentInfo }
              updatedPaymentInfo.cardHolderName = e.target.value
              setPaymentInfo(updatedPaymentInfo)
          }}
          />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
}

export default PaymentEntry
