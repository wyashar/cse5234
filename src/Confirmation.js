import React from "react"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"

const ViewConfirmation = () => {   
    const location = useLocation();
    const navigate = useNavigate(); 
    let title = "Confirmation Page";

    // Data placeholders, these will be passed into the page
    const products = ["milk", "eggs", "bread"];
    const quantities = [2, 4, 6];
    const costs = [10, 20, 30];

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
                Thank you for placing your order!
            </h2>
            Confirmation number: 123456789
            <h2>
                Order Details:
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
            <button onClick={() => navigate('/purchase')}>Return To Catalog</button>
        </div>
    )
}

export default ViewConfirmation