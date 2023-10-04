import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import product1 from "./Images/iphone13.jfif";
import product2 from "./Images/galaxywatch4.jfif";
import product3 from "./Images/sonyheadphones.jfif";
import product4 from "./Images/instantpot.jfif";
import product5 from "./Images/nintendoswitch.jfif";

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
    });

    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate(
            '/purchase/shippingEntry',
            {replace: true, state:{order: order}}
            )
    }

    const productImages = [product1, product2, product3, product4, product5];
    let title = "Purchase Items"
    return (
        <div className="container">
            <h4>{title}</h4>
            <form onSubmit={handleSubmit}>
            {order.productName.map((productName, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-2 d-flex align-items-center justify-content-center">
                            <img
                                src={productImages[index]}
                                style={{
                                    height: '100px',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}
                            ></img>
                    </div>
                  <div className="col-md-5">
                    <label>{productName}</label>
                    <p>{order.productDescription[index]}</p>
                    <p>${order.productPrice[index]}</p>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label htmlFor={`quantity-${index}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        className="form-control"
                        required
                        onChange={(e) => {
                            const updatedOrder = { ...order }
                            updatedOrder.buyQuantity[index] = e.target.value
                            setOrder(updatedOrder)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}

export default Purchase
