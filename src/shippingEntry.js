import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      <div style={{width: "600px"}} className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          {/* First Field */}
          <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Enter Name"
            required
            type="text"
            value={shippingInfo.name}
            onChange={(e) => {
              const updatedShippingInfo = { ... shippingInfo }
              updatedShippingInfo.name = e.target.value
              setShippingInfo(updatedShippingInfo)
            }}
          />
          </Form.Group>
          {/* Second Field */}
          <Form.Group className="mb-3" controlId="formAdress1">
          <Form.Label>Adress 1</Form.Label>
          <Form.Control
            placeHolder="Enter Adress 1"
            required
            type="text"
            value={shippingInfo.address1}
            onChange={(e) => {
              const updatedShippingInfo = { ... shippingInfo }
              updatedShippingInfo.address1 = e.target.value
              setShippingInfo(updatedShippingInfo)
            }}
          />
          </Form.Group>
          {/* Third Field */}
          <Form.Group className="mb-3" controlId="formAdress2">
          <Form.Label>Adress 2</Form.Label>
          <Form.Control
            placeholder="Enter Adress 2"
            type="text"
            value={shippingInfo.address2}
            onChange={(e) => {
              const updatedShippingInfo = { ... shippingInfo }
              updatedShippingInfo.address2 = e.target.value
              setShippingInfo(updatedShippingInfo)
            }}
          />
          </Form.Group>
          {/* Fourth Field */}
          <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            placeholder="Enter City"
            required
            type="text"
            value={shippingInfo.city}
            onChange={(e) => {
              const updatedShippingInfo = { ... shippingInfo }
              updatedShippingInfo.city = e.target.value
              setShippingInfo(updatedShippingInfo)
            }}
          />
          </Form.Group>
          {/* Fifth Field */}
          <Form.Group className="mb-3" controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control
            placeholder="Enter State"
            required
            type="text"
            value={shippingInfo.state}
            onChange={(e) => {
              const updatedShippingInfo = { ... shippingInfo }
              updatedShippingInfo.state = e.target.value
              setShippingInfo(updatedShippingInfo)
            }}
          />
          </Form.Group>
          {/* Fifth Field */}
          <Form.Group className="mb-3" controlId="formZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            placeholder="Enter Zip"
            required
            type="text"
            value={shippingInfo.zip}
            onChange={(e) => {
              const updatedShippingInfo = { ... shippingInfo }
              updatedShippingInfo.zip = e.target.value
              setShippingInfo(updatedShippingInfo)
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

export default ShippingEntry
