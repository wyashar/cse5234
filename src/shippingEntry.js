import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const ShippingEntry = () => {
    const order = useLocation()
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
        <div>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <div className="shipping-container">
                    <div className="shipping-info">
                    <label>Name:</label>
                    <input
                        type="text"
                        required
                        value={shippingInfo.name}
                        onChange={(e) => {
                            const updatedShippingInfo = { ...shippingInfo}
                            updatedShippingInfo.name = e.target.value;
                            setShippingInfo(updatedShippingInfo)
                        }}
                    ></input>
                    <label>Adress Line 1:</label>
                    <input
                        type="text"
                        required
                        value={shippingInfo.adress1}
                        onChange={(e) => {
                            const updatedShippingInfo = { ...shippingInfo}
                            updatedShippingInfo.adress1 = e.target.value;
                            setShippingInfo(updatedShippingInfo)
                        }}
                    ></input>
                    <label>Adress Line 2:</label>
                    <input
                        type="text"
                        required
                        value={shippingInfo.address2}
                        onChange={(e) => {
                            const updatedShippingInfo = { ...shippingInfo}
                            updatedShippingInfo.address2 = e.target.value;
                            setShippingInfo(updatedShippingInfo)
                        }}
                    ></input>
                    <label>City:</label>
                    <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => {
                            const updatedShippingInfo = { ...shippingInfo}
                            updatedShippingInfo.city = e.target.value;
                            setShippingInfo(updatedShippingInfo)
                        }}
                    ></input>
                    <label>State:</label>
                    <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => {
                            const updatedShippingInfo = { ...shippingInfo}
                            updatedShippingInfo.state = e.target.value;
                            setShippingInfo(updatedShippingInfo)
                        }}
                    ></input>
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        required
                        value={shippingInfo.zip}
                        onChange={(e) => {
                            const updatedShippingInfo = { ...shippingInfo}
                            updatedShippingInfo.zip = e.target.value;
                            setShippingInfo(updatedShippingInfo)
                        }}
                    ></input>
                    </div>
                </div>
                <button className='button'>Submit</button>
            </form>
        </div>
    )
}

export default ShippingEntry
