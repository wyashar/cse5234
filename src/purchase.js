import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Purchase = () => {
  const [order, setOrder] = useState({
    productName: [],
    buyQuantity: [],
    productDescription: [],
    productPrice: [],
  })
  const [stockQuantity, setStockQuantity] = useState([]);
  const [productImages, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/get_product")
      .then((response) => {
        if (Array.isArray(response.data)) {
          //I don't think we need this but it allows up to not change the return. If we delete this the useState will have no change, but I couldn't get it to work w/o this
          const productName = response.data.map(product => product.name);
          const productDescription = response.data.map(product => product.description);
          const productPrice = response.data.map(product => product.price);

          // Im not sure how we need to do the quantity stuff with the /update_quantity so keeping at 0 for now
          const buyQuantity = new Array(response.data.length).fill(0);

          setStockQuantity(response.data.map(product => product.quantity));
          setImages(response.data.map(product => product.image_url));

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


    const navigate = useNavigate();
    const handleSubmit = () => {

      // checks that at least one box has a quantity, and checks that all quantities dont exceed the stock.
        if (!order.buyQuantity.some(quantity => {
            const parsedQuantity = parseInt(quantity, 10);
            return !isNaN(parsedQuantity) && parsedQuantity !== 0 && quantity !== "";
          })) {
          alert("You must select a quantity of some item to proceed.");
        } else {
          navigate(
            '/purchase/shippingEntry',
            {replace: true, state:{order: order}}
          )
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
                        //required
                        onChange={(e) => {
                            const updatedOrder = { ...order }
                            updatedOrder.buyQuantity[index] = e.target.value
                            setOrder(updatedOrder)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}

export default Purchase
