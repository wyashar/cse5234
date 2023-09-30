import React from "react"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"

const ViewConfirmation = () => {   
    const location = useLocation();
    const order = location.state.order;
    const paymentInfo = location.state.paymentInfo;
    const shippingInfo = location.state.shippingInfo;
    const productName = order.productName;
    const navigate = useNavigate(); 
    let title = "Confirmation Page";
    let totalCost = 0;

    for (let i = 0; i < order.productName.length; i++) {
        totalCost += order.buyQuantity[i]*order.productPrice[i];
    }
    

    return (
        <div>
            <h1>
                {title}
            </h1>
            <h2>
                Thank you for placing your order!
            </h2>
            Confirmation number: {Math.floor(Math.random() * 999999999) + 100000000}
            <h2>
                Order Details:
            </h2>
            <table>
                {productName.map((productName, i) => 
                    <tr>
                        <th>{"Product: " + productName}</th>
                        <th>{"| Quantity: " + order.buyQuantity[i]}</th>
                        <th>{"| Cost: " + order.buyQuantity[i] + " x $" + order.productPrice[i] + " = $" + order.buyQuantity[i]*order.productPrice[i]}</th>
                    </tr>)
                }
                {"Total order cost: $" + totalCost}
            </table>
            <button onClick={() => navigate('/purchase')}>Return To Catalog</button>
        </div>
    )
}

export default ViewConfirmation