import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./components/purchase.css";

const Purchase = () => {
    const [order, setOrder] = useState({
        productName: ["iPhone 13", "Samsung Galaxy Watch 4", "Sony WH-1000XM4 Headphones", "Instant Pot Duo Evo Plus", "Nintendo Switch"],
        productDescription: ["The latest iPhone model with a powerful A15 Bionic chip and a stunning Super Retina XDR display",
        "A feature-packed smartwatch with health and fitness tracking, AMOLED display, and long battery life",
        "Premium noise-canceling headphones with excellent sound quality and all-day comfort",
        "A versatile multicooker that can pressure cook, sauté, steam, and more, making meal prep a breeze",
        "A popular gaming console that offers both portable and TV modes for gaming on the go or at home"],
        productPrice: [799, 249, 349, 119, 299],
        buyQuantity: [0,0,0,0,0],
        creditCardNumber: '',
        expirDate: '',
        cvvCode: '',
        cardHolderName: '',
        addressOne: '',
        adressTwo: '',
        city: '',
        state: '',
        zip:'',
    });

    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate(
            '/purchase/shippingEntry',
            {replace: true, state:{order: order}}
            )
    }

    let title = "Purchase Page"
    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                {order.productName.map((productName, index) => (
                    <div key={index} className="product-container">
                        <div className="product-info">
                            <label>{productName}</label>
                            <p>Description: {order.productDescription[index]}</p>
                            <p>Price: ${order.productPrice[index]}</p>
                            <input
                            type="number"
                            required
                            onChange={(e) => {
                                const updatedOrder = { ...order };
                                updatedOrder.buyQuantity[index] = e.target.value;
                                setOrder(updatedOrder);
                            }}
                        />
                        <br />
                        </div>
                    </div>
                ))}
                <button type='submit' className='button'>Pay</button>
            </form>
        </div>
    )
}

export default Purchase
