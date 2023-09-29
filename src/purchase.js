import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./components/purchase.css";

const Purchase = () => {    
    const [order, setOrder] = useState({
        productName: ["Apple", "Orange", "Banana", "Mango", "Kiwi"],
        productDescription: ["Apple2", "Orange2", "Banana3", "Mango4", "Kiwi5"],
        productPrice: [1, 2, 3, 4, 5],
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
        navigate('/purchase/paymentEntry', {order: order, setOrder: setOrder});
    }

    console.log('order: ', order);

    let title = "Purchase Page"
    return (
        <div>
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
                <button className='button'>Pay</button>
            </form>
        </div>
    )
}

export default Purchase