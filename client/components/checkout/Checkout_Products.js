import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../../store/index.js";
import "./Checkout.css";

const CheckoutProducts = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(user);
  useEffect(() => {
    dispatch(fetchOrderDetails(user));
  }, []);

  const orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

  if (!orderDetails) {
    return null;
  }

  if (!orderDetails.products) {
    return null;
  }
  // console.log(user);
  // console.log("orderDetails", orderDetails);
  // console.log(orderDetails.totalItems);
  return (
    <>
      <div>
        <h1 className="checkout-header">Product Details</h1>
        {/* <nav>
        {isLoggedIn ? (
        <div className="nav-links">
      The navbar will show these links after you log in 
      </div> 
        ) : ( 
         <div> 
         The navbar will show these links before you log in 
        )} 
        </nav>  */}
        <div className="checkout-prod"></div>
        {!!orderDetails.totalItems ? (
          <div className="check-cont">
            {orderDetails.products.map((product) => (
              <div key={product.id} className="single-product-check-cont">
                <Link to={`/products/${product.id}`}>
                  <img className="cart-image" src={product.imageURL}></img>
                </Link>
                <div className="order-info-cont-text">
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.name}</h3>
                    <h4>
                      {product.orderproduct.itemCount} x{" "}
                      {product.price.toLocaleString("en-US")}
                    </h4>
                    <h3>
                      $
                      {(
                        product.price * product.orderproduct.itemCount
                      ).toLocaleString("en-US")}
                    </h3>
                  </Link>
                </div>
              </div>
            ))}

            <div className="checkout-cont">
              <div className="total-cont">
                Subtotal ({orderDetails.totalItems} items): $
                {orderDetails.totalPrice.toLocaleString("en-US")} <br />
                Shipping : Free <br />
                Estimated Tax: $
                {Math.round(orderDetails.totalPrice * 0.07).toFixed(2)}
              </div>
              <h3 className="total-cont-order">
                Order Total: $
                {(orderDetails.totalPrice * 1.07).toLocaleString("en-US")}
              </h3>
            </div>
          </div>
        ) : (
          <div>
            <div className="cart-cont">
              <div className="header">
                <h1>Shopping Cart</h1>
                <Link to="/orders/previous_orders">View Previous Orders</Link>
              </div>
            </div>
            <h2>
              {user.first_name}, you have nothing in your cart. Click
              <Link to="/home"> here to</Link> add products
            </h2>
            <Link to="/home">Continue Shopping</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutProducts;
