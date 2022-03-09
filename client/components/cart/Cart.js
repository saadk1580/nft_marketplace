import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderDetails,
  deleteOrder,
  updateOrder,
  fetchHistory,
} from "../../store/index.js";
import "./Cart.css";
import Alert from "@mui/material/Alert";

const totalInv = {};

const Cart = () => {
  const state = useSelector((state) => state);
  const user = state.auth;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("joe");
  const [error, setError] = useState("");
  const [currentVal, setCurrentVal] = useState(0);
  // const [invLimit, setInvLimit] = useState(0);

  const userOrderId = state.orders
    .filter((order) => order.userId === user.id)
    .map((order) => order.id)[0];

  const orderToAdd = {
    id: userOrderId,
    totalItems,
    totalPrice,
    productId,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails(user));
    dispatch(fetchHistory(user));
  }, []);

  let orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    orderDetails = cart;
  }

  if (!orderDetails) {
    return null;
  }

  if (!orderDetails.products) {
    return null;
  }

  console.log("orderDetails", orderDetails);

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {orderDetails.totalItems ? (
        <div>
          <ul className="cart-cont-cart">
            {orderDetails.products.map((product, idx) => {
              if (!totalInv.hasOwnProperty(product.id)) {
                totalInv[product.id] =
                  product.orderproduct.itemCount + product.inventory;
              }

              return (
                <div key={product.id} className="single-prod-cont-cart">
                  <Link to={`/products/${product.id}`} className="image">
                    <div
                      style={{
                        backgroundImage: `url(${product.imageURL}) `,
                        width: "70px",
                        height: "70px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    ></div>
                  </Link>
                  <div className="order-data">
                    <Link to={`/products/${product.id}`}>
                      <div>
                        <h3>{product.name}</h3>
                      </div>
                    </Link>
                    <div>
                      Price per Item: ${product.price.toLocaleString("en-US")}
                    </div>
                    <div className="update-order-cont">
                      <div className="quantity-cont">Quantity:</div>
                      <input
                        className="input-cont"
                        type="number"
                        opacity={1}
                        step={1}
                        defaultValue={product.orderproduct.itemCount}
                        min={0}
                        max={totalInv[product.id]}
                        onChange={(ev) => {
                          setTotalItems(ev.target.value * 1);
                          setTotalPrice(ev.target.value * product.price);
                          setProductId(product.id);
                          productId !== product.id && setError("");
                        }}
                        onClick={(ev) => {
                          productId !== product.id && setError("");
                          setProductId(product.id);
                          ev.target.value * 1 === totalInv[product.id] &&
                          ev.target.value * 1 === currentVal
                            ? setError("Inventory Limit Has Been Reached")
                            : setError("");
                          setCurrentVal(ev.target.value * 1);
                        }}
                      ></input>

                      <button
                        className="update-button"
                        disabled={
                          productId === "joe" ||
                          product.id !== productId ||
                          totalItems === 0
                        }
                        onClick={() => {
                          dispatch(
                            updateOrder(orderDetails, orderToAdd, product)
                          );
                          setProductId("Joe");
                        }}
                      >
                        Update Order Quantity
                      </button>
                      <button
                        className="delete-button"
                        onClick={() =>
                          dispatch(deleteOrder(orderDetails, product))
                        }
                      >
                        Delete NFT from Order
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="order-footer">
              <div className="continue-shopping-cont">
                <Link to="/home">Continue Shopping</Link>
              </div>
              <div className="total-cont">
                <div className="subtotal-cont">
                  {" "}
                  Subtotal ({orderDetails.totalItems}{" "}
                  {orderDetails.totalItems === 1 ? "item" : "items"}): $
                  {orderDetails.totalPrice.toLocaleString("en-US")}
                </div>
                <div className="checkout-cont-cart">
                  <Link
                    to="/orders/checkout"
                    className="link-to-checkout-cont-cart"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </ul>
        </div>
      ) : (
        <div className="order-footer-no-items">
          <div className="continue-shopping-cont-no-items">
            <div>You have no items in your cart shopping right now.</div>
            <Link to="/home">Shop Now!</Link>
          </div>
        </div>
      )}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  );
};

export default Cart;
