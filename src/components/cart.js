import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cookies, setCookie] = useCookies(['productName', 'buyQuantity', 'productDescription', 'productPrice']);
  const [order, setOrder] = useState({
    productName: cookies.productName,
    buyQuantity: cookies.buyQuantity,
    productDescription: cookies.productDescription,
    productPrice: cookies.productPrice,
  })
  let productName = cookies.productName;
  let buyQuantity = cookies.buyQuantity;
  let productDescription = cookies.productDescription;
  let productPrice = cookies.productPrice;
  let totalCost = 0;
  

  if (productName == null || productName.length == 0) {
    productName = ["Empty Cart"];
    buyQuantity = [""];
    productPrice = [""];
  } else {
    for (let i = productName.length - 1; i >= 0; i--) {
      if(buyQuantity[i] < 1) {
        productName.splice(i, 1)
        buyQuantity.splice(i, 1)
        productPrice.splice(i, 1)
      }
    }
    for (let i = 0; i < productName.length; i++) {
      totalCost += buyQuantity[i]*productPrice[i];
    }
  }

  const navigate = useNavigate();
  const purchase = () => {
    if (productName[0] === "Empty Cart") {
      alert("Your cart is empty.");
    } else {
      navigate(
        '/purchase/shippingEntry',
        {replace: true, state:{order: order}}
      )
    }
  }

  const resetCart = () => {
        const shoppingCartButton = document.getElementById("shoppingCartButton");
        const shoppingCartNumber = document.getElementById("shoppingCartNumber");
        setCookie('productName', []);
        setCookie('buyQuantity', []);
        setCookie('productDescription', []);
        setCookie('productPrice', []);
        productName = ["Empty Cart"];
        buyQuantity = [""];
        productPrice = [""];
        shoppingCartButton.style.cssText = '';
        shoppingCartNumber.style.cssText = '';
        shoppingCartNumber.innerHTML = 0;
        window.location.reload(true);
  }

  return (
    <div>
      <h1>
        Shopping Cart
      </h1>
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
                  <td>{buyQuantity[i]}</td>
                  <td>${(buyQuantity[i] * productPrice[i]).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total order cost: ${totalCost.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <button onClick={purchase} className="btn btn-primary m-3">Purchase Now</button>
          <button onClick={resetCart} className="btn btn-primary m-3">Reset Cart</button>
    </div>
  );
};
  
export default Cart;