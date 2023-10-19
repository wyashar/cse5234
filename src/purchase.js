import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import product1 from "./Images/iphone13.jfif";
import product2 from "./Images/galaxywatch4.jfif";
import product3 from "./Images/sonyheadphones.jfif";
import product4 from "./Images/instantpot.jfif";
import product5 from "./Images/nintendoswitch.jfif";
import axios from "axios";

const Purchase = () => {
  const [order, setOrder] = useState({
    productName: [],
    productDescription: [],
    productPrice: [],
    buyQuantity: [],
  });

    useEffect(() =>{
      axios.get("http://localhost:7000/get_product", {
        params: {}
      }).then((data) =>{
          const data_ = JSON.parse(JSON.stringify(data.data))
          data_.forEach(order_ => {
            order.buyQuantity[order_.Id-1] = order_.quantity
          })
          setOrder({...order})
      })
    }, [])

    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate(
            '/purchase/shippingEntry',
            {replace: true, state:{order: order}}
            )
    }

    const productImages = [product1, product2, product3, product4, product5];
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
                    <p>${order.productPrice[index]}</p>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label htmlFor={`quantity-${index}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        className="form-control"
                        required
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
