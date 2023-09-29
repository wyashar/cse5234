import React from "react"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"

const ViewOrder = () => {    
    const location = useLocation();
    const navigate = useNavigate();
    let title = "View Order Page";

    // Data placeholders, these will be passed into the page
    const products = ["milk", "eggs", "bread"];
    const quantities = [2, 4, 6];
    const costs = [10, 20, 30];
    const cardNumber = "1234567812345678";
    const expirationDate = "01/23";
    const ccv = "999";
    const holderName = "John Doe";
    const shippingName = "John Doe";
    const address1 = "123 Blue Rd";
    const address2 = "";
    const city = "Columbus";
    const state = "Ohio";
    const zip = "43201";


    let totalCost = 0;

    for (let i = 0; i < products.length; i++) {
        totalCost += quantities[i]*costs[i];
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
                {products.map((product, i) => 
                    <tr>
                        <th>{"Product: " + product}</th>
                        <th>{"| Quantity: " + quantities[i]}</th>
                        <th>{"| Cost: " + quantities[i] + " x $" + costs[i] + " = $" + quantities[i]*costs[i]}</th>
                    </tr>)
                }
                {"Total order cost: $" + totalCost}
            </table>
            <h2>
                Payment Info:
            </h2>
            <table>
                <tr>
                    <th>Credit card number |</th> <th>{cardNumber}</th>
                </tr>
                <tr>
                    <th>Expiration date |</th> <th>{expirationDate}</th>
                </tr>
                <tr>
                    <th>CCV code |</th> <th>{ccv}</th>
                </tr>
                <tr>
                    <th>Card holder name |</th> <th>{holderName}</th>
                </tr>
            </table>
            <h2>
                Shipping Info:
            </h2>
            <table>
                <tr>
                    <th>Shipping name |</th> <th>{shippingName}</th>
                </tr>
                <tr>
                    <th>Address 1 |</th> <th>{address1}</th>
                </tr>
                <tr>
                    <th>Address 2 |</th> <th>{address2}</th>
                </tr>
                <tr>
                    <th>City |</th> <th>{city}</th>
                </tr>
                <tr>
                    <th>State |</th> <th>{state}</th>
                </tr>
                <tr>
                    <th>Zip |</th> <th>{zip}</th>
                </tr>
            </table>
            <button onClick={() => navigate('/purchase/viewConfirmation')}>Place Order</button>
        </div>
    )
}

export default ViewOrder