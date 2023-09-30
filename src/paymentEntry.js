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
        <div>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <div className="payment-container">
                    <div className="payment-info">
                    <label>Name on Card:</label>
                    <input
                        type="text"
                        required
                        value={paymentInfo.cardHolderName}
                        onChange={(e) => {
                            const updatedPaymentInfo = { ...paymentInfo}
                            updatedPaymentInfo.cardHolderName = e.target.value;
                            setPaymentInfo(updatedPaymentInfo)
                        }}
                    ></input>
                    <label>Card Number:</label>
                    <input
                        type="text"
                        required
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                            const updatedPaymentInfo = { ...paymentInfo}
                            updatedPaymentInfo.cardNumber = e.target.value;
                            setPaymentInfo(updatedPaymentInfo)
                        }}
                    ></input>
                    <label>Card Expiration Date</label>
                    <input
                        type="text"
                        required
                        value={paymentInfo.cardExp}
                        onChange={(e) => {
                            const updatedPaymentInfo = { ...paymentInfo}
                            updatedPaymentInfo.cardExp = e.target.value;
                            setPaymentInfo(updatedPaymentInfo)
                        }}
                    ></input>
                    <label>Card Verification Number</label>
                    <input
                        type="text"
                        required
                        value={paymentInfo.cardCVV}
                        onChange={(e) => {
                            const updatedPaymentInfo = { ...paymentInfo}
                            updatedPaymentInfo.cardCVV = e.target.value;
                            setPaymentInfo(updatedPaymentInfo)
                        }}
                    ></input>
                    </div>
                </div>
                <button type='submit' className='button'>Submit</button>
            </form>
        </div>
    )
}

export default PaymentEntry
