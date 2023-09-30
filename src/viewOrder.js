import React from "react"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"

const ViewOrder = () => {    
    const location = useLocation();
    const order = location.state.order;
    const paymentInfo = location.state.paymentInfo;
    const shippingInfo = location.state.shippingInfo;
    const productName = order.productName;
    const navigate = useNavigate();
    let title = "View Order Page";
    let totalCost = 0;

    for (let i = order.productName.length - 1; i >= 0; i--) {
        if(order.buyQuantity[i] < 1) {
            order.productName.splice(i, 1)
            order.buyQuantity.splice(i, 1)
            order.productPrice.splice(i, 1)
        }
    }

    for (let i = 0; i < order.productName.length; i++) {
        totalCost += order.buyQuantity[i]*order.productPrice[i];
    }

    return (
        <div>
            <h1>
                {title}
            </h1>
            <h2>
                Order Info:
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
            <h2>
                Payment Info:
            </h2>
            <table>
                <tr>
                    <th>Credit card number |</th> <th>{paymentInfo.cardNumber}</th>
                </tr>
                <tr>
                    <th>Expiration date |</th> <th>{paymentInfo.cardExp}</th>
                </tr>
                <tr>
                    <th>CCV code |</th> <th>{paymentInfo.cardCVV}</th>
                </tr>
                <tr>
                    <th>Card holder name |</th> <th>{paymentInfo.cardHolderName}</th>
                </tr>
            </table>
            <h2>
                Shipping Info:
            </h2>
            <table>
                <tr>
                    <th>Shipping name |</th> <th>{shippingInfo.name}</th>
                </tr>
                <tr>
                    <th>Address 1 |</th> <th>{shippingInfo.address1}</th>
                </tr>
                <tr>
                    <th>Address 2 |</th> <th>{shippingInfo.address2}</th>
                </tr>
                <tr>
                    <th>City |</th> <th>{shippingInfo.city}</th>
                </tr>
                <tr>
                    <th>State |</th> <th>{shippingInfo.state}</th>
                </tr>
                <tr>
                    <th>Zip |</th> <th>{shippingInfo.zip}</th>
                </tr>
            </table>
            <button onClick={() => navigate('/purchase/viewConfirmation',
            {
                replace: true,
                state: {
                    shippingInfo: shippingInfo,
                    order: order,
                    paymentInfo: paymentInfo
                }
            })}>Place Order</button>
        </div>
    )
}

export default ViewOrder