import React from "react"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"

const ViewConfirmation = () => {
    const location = useLocation();
    const order = location.state.order;
    const orderId = location.state.orderId;
    const productName = order.productName;
    const stockErrors = location.state.stockErrors;
    const navigate = useNavigate();
    let title = "Confirmation Page";
    let totalCost = 0;

    for (let i = 0; i < order.productName.length; i++) {
        totalCost += order.buyQuantity[i]*order.productPrice[i];
    }


    return (
        <div className="container">
          <h1>{title}</h1>
          <h2>Thank you for placing your order!</h2>
          <p>Confirmation number: {orderId}</p>
          <h2>Order Details:</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {productName.map((productName, i) => (
                <tr key={i}>
                  <td>{productName}</td>
                  <td>{order.buyQuantity[i]}</td>
                  <td>${order.buyQuantity[i] * order.productPrice[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-danger">
            {stockErrors.length > 0 && (
              <div>
                <p>Due to unavailable stock, the following items have been removed from your order:</p>
                <ul>
                  {stockErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
                <p>NOTE: You will not be charged for these items.</p>
              </div>
            )}
          </p>
          <p>Total order cost: ${totalCost}</p>
          <button className="btn btn-outline-primary" onClick={() => navigate('/purchase')}>
            Return To Catalog
          </button>
        </div>
      )
}

export default ViewConfirmation
