import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

const Purchase = () => {
  const [order, setOrder] = useState({
    productName: [],
    buyQuantity: [],
    productDescription: [],
    productPrice: [],
  })
  const [stockQuantity, setStockQuantity] = useState([]);
  const [productImages, setImages] = useState([]);
  const [cookies, setCookie] = useCookies(['productName', 'buyQuantity', 'productDescription', 'productPrice']);

  useEffect(() => {
    axios.get("http://localhost:7000/products")
      .then((response) => {
        if (Array.isArray(response.data)) {
          //I don't think we need this but it allows up to not change the return. If we delete this the useState will have no change, but I couldn't get it to work w/o this
          const productName = response.data.map(product => product.name);
          const productDescription = response.data.map(product => product.description);
          const productPrice = response.data.map(product => product.price);

          const buyQuantity = new Array(response.data.length).fill(0);
          if (cookies.buyQuantity == null || cookies.buyQuantity.length == 0){
            setCookie('buyQuantity', buyQuantity);
          } else {
            for (let i = 0; i < buyQuantity.length; i++) {
              buyQuantity[i] = cookies.buyQuantity[i];
            }
          }
          displayShoppingCartQuantity()

          setStockQuantity(response.data.map(product => product.quantity));
          setImages(response.data.map(product => product.image));

          //This is populating
          setOrder({
            productName,
            buyQuantity,
            productDescription,
            productPrice,
          });
        } else {
          console.error("Invalid response data:", response.data); //If the arrays don't match
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error); //Other data issue
      });
  }, []);

  function displayShoppingCartQuantity() {
    if (cookies.productName != null && cookies.productName.length != 0) {
      const shoppingCartButton = document.getElementById("shoppingCartButton");
      const shoppingCartNumber = document.getElementById("shoppingCartNumber");
      let totalQuantity = 0;
      shoppingCartButton.style.color = '#212529';
      shoppingCartButton.style.backgroundColor = '#ffdd40';
      shoppingCartButton.style.fontWeight = 'bold';
      shoppingCartNumber.style.color = '#212529';
      shoppingCartNumber.style.backgroundColor = '#ffdd40';
      cookies.buyQuantity.forEach(quantity => {totalQuantity += parseInt(quantity, 10);});
      shoppingCartNumber.innerHTML = totalQuantity;
    }
  }


    const navigate = useNavigate();
    const handleSubmit = () => {
      // checks that at least one box has a quantity, and checks that all quantities dont exceed the stock.
        if (!order.buyQuantity.some(quantity => {
            const parsedQuantity = parseInt(quantity, 10);
            return !isNaN(parsedQuantity) && parsedQuantity !== 0 && quantity !== "";
          })) {
          alert("You must select a quantity of some item to proceed.");
        } else {
          setCookie('productName', order.productName);
          setCookie('buyQuantity', order.buyQuantity);
          setCookie('productDescription', order.productDescription);
          setCookie('productPrice', order.productPrice);
          displayShoppingCartQuantity()
          navigate(
            '/purchase/shippingEntry',
            {replace: true, state:{order: order}}
          )
        }
    }

    const handleAddToCart = () => {
      // checks that at least one box has a quantity, and checks that all quantities dont exceed the stock.
      if (!order.buyQuantity.some(quantity => {
        const parsedQuantity = parseInt(quantity, 10);
        return !isNaN(parsedQuantity) && parsedQuantity !== 0 && quantity !== "";
        })) {
        alert("You must select a quantity of some item to proceed.");
      } else {
        setCookie('productName', order.productName);
        setCookie('buyQuantity', order.buyQuantity);
        setCookie('productDescription', order.productDescription);
        setCookie('productPrice', order.productPrice);
        displayShoppingCartQuantity()
        window.location.reload(true);
      }
    }

    let title = "Purchase Items"
    return (
        <div className="container">
            <h4>{title}</h4>
            <form onSubmit={handleSubmit}>
            {order.productName.map((productName, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-2 d-flex align-items-center justify-content-center">
                            <img
                                src={productImages[index]}
                                style={{
                                    height: '100px',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}
                            ></img>
                    </div>
                  <div className="col-md-5">
                    <label>{productName}</label>
                    <p>{order.productDescription[index]}</p>
                    <div className="row">
                      <p className="col-md-6">${order.productPrice[index]}</p>
                      <p className="col-md-6">{"In stock: " + stockQuantity[index]}</p>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label htmlFor={`quantity-${index}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        className="form-control"
                        min = "0"
                        max = {`${stockQuantity[index]}`}
                        defaultValue = {`${cookies.buyQuantity[index]}`}
                        onChange={(e) => {
                            const updatedOrder = { ...order }
                            updatedOrder.buyQuantity[index] = e.target.value
                            if (updatedOrder.buyQuantity[index] > stockQuantity[index]) {
                              updatedOrder.buyQuantity[index] = stockQuantity[index];
                            }
                            setOrder(updatedOrder)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="submit" className="btn btn-outline-primary m-3">Purchase Now</button>
              <button type="button" onClick={handleAddToCart} className="btn btn-outline-primary">Add to Cart</button>
            </form>
        </div>
    )
}

export default Purchase
