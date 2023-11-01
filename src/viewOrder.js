import axios from "axios";
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"
import { useCookies } from 'react-cookie';
import App from "./App";

const ViewOrder = () => {
  const [cookies, setCookie] = useCookies(['productName', 'buyQuantity', 'productDescription', 'productPrice']);
    const location = useLocation();
    const order = location.state.order;
    const paymentInfo = location.state.paymentInfo;
    const shippingInfo = location.state.shippingInfo;
    const productName = order.productName;
    const [stockErrors, setStockErrors] = useState([]);
    const [quantitiesFinished, setQuantitiesFinished] = useState(false);
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

    const createOrderId = () => {
      const date = new Date();
      const id = parseInt(`${Math.floor(Math.random() * 500) + 242}${date.getDate()}${date.getHours()}`);
      return id
    }

    const orderId = createOrderId()
    const updateDatabaseQuantities = () => {

      for(let i = 0; i < order.productName.length; i++){
        const data = {
          name: order.productName[i],
          buyQuantity: order.buyQuantity[i]
        }
        axios.post("http://localhost:7000/update_quantity", data)
        .then((response) => {
          if (i === order.productName.length - 1) {
            setQuantitiesFinished(true);
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const errorData = error.response.data;
            if (errorData.name) {
              setStockErrors(oldArray => [...oldArray, errorData.name]);
              const index = order.productName.indexOf(errorData.name)
              order.productName.splice(index, 1)
              order.buyQuantity.splice(index, 1)
              order.productDescription.splice(index, 1)
              order.productPrice.splice(index, 1)
              if (i === order.productName.length - 1) {
                setQuantitiesFinished(true);
              }
            }
          }
          console.error(`Failed to update db quantities`, error);
        })
      }
    };

    const updateOrder = () => {
      const data = {
        name: order.productName,
        buyQuantity: order.buyQuantity,
        orderId: orderId,
      };

      axios
        .post("http://localhost:7000/create_order", data)
        .then((response) => {
          const res_data = response.data;
          console.log("Order created successfully:", res_data);
        })
        .catch((error) => {
          console.error("Failed to create an order", error);
        });
    };




    const navigate = useNavigate()
    const handleSubmit = () => {
      updateDatabaseQuantities()
    }

    useEffect(() => {
      if (quantitiesFinished) {
        updateOrder()
        const shoppingCartButton = document.getElementById("shoppingCartButton");
        const shoppingCartNumber = document.getElementById("shoppingCartNumber");
        setCookie('productName', []);
        setCookie('buyQuantity', []);
        setCookie('productDescription', []);
        setCookie('productPrice', []);
        shoppingCartButton.style.cssText = '';
        shoppingCartNumber.style.cssText = '';
        shoppingCartNumber.innerHTML = 0;
        navigate('/purchase/viewConfirmation', {
          replace: true,
          state: {
          shippingInfo: shippingInfo,
          order: order,
          paymentInfo: paymentInfo,
          orderId: orderId,
          stockErrors: stockErrors
          },
        })
      }
    }, [quantitiesFinished]);

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
          {stockErrors.length > 0 ? (
            <button
            onClick={() => navigate('/purchase')}
            className="btn btn-primary"
            >
            Return To Catalog
            </button>
          ) : (
            <button
            onClick={handleSubmit}
            className="btn btn-primary"
            >
            Place Order
            </button>
          )}
        </div>
      )
}

export default ViewOrder
