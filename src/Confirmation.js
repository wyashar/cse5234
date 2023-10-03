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
        <div className="container">
          <h1>{title}</h1>
          <h2>Thank you for placing your order!</h2>
          <p>Confirmation number: {Math.floor(Math.random() * 999999999) + 100000000}</p>
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
          <p>Total order cost: ${totalCost}</p>
          <button className="btn btn-outline-primary" onClick={() => navigate('/purchase')}>
            Return To Catalog
          </button>
        </div>
      )
}

export default ViewConfirmation
