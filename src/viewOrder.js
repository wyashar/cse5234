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
        <div className="container">
          <h1>{title}</h1>
          <h2>Order Info:</h2>
          <table className="table">
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
                  <td>${(order.buyQuantity[i] * order.productPrice[i]).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total order cost: ${totalCost.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <h2>Payment Info:</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>Credit card number:</th>
                <td>{paymentInfo.cardNumber}</td>
              </tr>
              <tr>
                <th>Expiration date:</th>
                <td>{paymentInfo.cardExp}</td>
              </tr>
              <tr>
                <th>CCV code:</th>
                <td>{paymentInfo.cardCVV}</td>
              </tr>
              <tr>
                <th>Card holder name:</th>
                <td>{paymentInfo.cardHolderName}</td>
              </tr>
            </tbody>
          </table>

          <h2>Shipping Info:</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>Shipping name:</th>
                <td>{shippingInfo.name}</td>
              </tr>
              <tr>
                <th>Address 1:</th>
                <td>{shippingInfo.address1}</td>
              </tr>
              <tr>
                <th>Address 2:</th>
                <td>{shippingInfo.address2}</td>
              </tr>
              <tr>
                <th>City:</th>
                <td>{shippingInfo.city}</td>
              </tr>
              <tr>
                <th>State:</th>
                <td>{shippingInfo.state}</td>
              </tr>
              <tr>
                <th>Zip:</th>
                <td>{shippingInfo.zip}</td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={() =>
              navigate('/purchase/viewConfirmation', {
                replace: true,
                state: {
                  shippingInfo: shippingInfo,
                  order: order,
                  paymentInfo: paymentInfo,
                },
              })
            }
            className="btn btn-primary"
          >
            Place Order
          </button>
        </div>
      )
}

export default ViewOrder
