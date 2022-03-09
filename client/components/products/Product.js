import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder, editProduct } from "../../store/index.js";
import "./Products.css";
import { Link, useParams } from "react-router-dom";

import "./Product.css";

export default function Product() {
  const state = useSelector((state) => state);
  const thisProductId = useParams().id;

  const product = state.products.filter(
    (product) => product.id === thisProductId
  );

  const products = state.products;

  const dispatch = useDispatch();
  const user = state.auth;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("");

  const userOrderId = state.orders
    .filter((order) => order.userId === user.id)
    .map((order) => order.id)[0];

  const orderToAdd = {
    id: userOrderId,
    totalItems,
    totalPrice,
    productId,
  };

  const [category, setCategory] = useState();

  switch (category) {
    case "/products/Crypto_Punks":
      category = "Crypto Punks";
      break;
    case "/products/Azuki":
      category = "Azuki";
      break;
    case "/products/Clone_X":
      category = "Clone X";
      break;
    case "/products/Tasty_Bones":
      category = "Tasty Bones XYZ";
      break;
    case "/products/The_Metascapes":
      category = "The Metascapes";
      break;
    case "/products/The_Ladies":
      category = "The Ladies";
      break;
    case "/products/Grumpets":
      category = "Grumpets";
      break;
    case "/products/Little_Lemon_Friends":
      category = "Little Lemon Friends";
      break;
    default:
      break;
  }

  console.log(category);

  return (
    <div className="single-product-container">
      {product.map((product) => (
        <div key={product.id}>
          <div className="product-single">
            <img className="product-img" src={product.imageURL} />
            <div className="single-product-details">
              <p style={{ fontSize: "6rem", marginTop: "10px" }}>
                <b clas>
                  Collection: <br />
                </b>
                <Link to={`/products/${product.category}`}>
                  {product.category}
                </Link>
              </p>
              <h1 style={{ margin: "30px 0  " }}>{product.name}</h1>

              <div className="nested-details">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "30px 0",
                  }}
                >
                  <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
                    Buy Now
                  </p>
                  <p
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "900",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1rem", marginRight: "2px" }}>
                      $
                    </span>
                    {product.price.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
              <form
                className="add-btn"
                style={{
                  backgroundColor: "#ffffff",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <select
                  name="quantity"
                  onChange={(ev) => {
                    setTotalItems(ev.target.value * 1);
                    setTotalPrice(ev.target.value * product.price);
                    setProductId(product.id);
                  }}
                  style={{
                    width: "120px",
                    margin: "20px 10px",
                    textAlign: "center",
                  }}
                >
                  <option>Choose Quantity</option>
                  {new Array(product.inventory).fill("").map((_, idx) => (
                    <option>{idx + 1}</option>
                  ))}
                </select>
                <button
                  className="addToCart"
                  disabled={product.id !== productId || totalItems === 0}
                  onClick={(ev) => {
                    dispatch(addToOrder(orderToAdd, user, product));
                    dispatch(editProduct(orderToAdd, product));
                    setProductId("");
                    console.log(JSON.stringify(orderToAdd));
                  }}
                >
                  {product.inventory === 0 ? "Out of Stock" : "Add to cart"}
                </button>
              </form>
            </div>
          </div>
          <div className="product-suggestions-container">
            <h3
              style={{
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              More From This Collection
            </h3>
            <div className="single-suggested-products">
              {products
                .filter(
                  (p) => p.category === product.category && p.id !== product.id
                )
                .slice(0, 4)
                .map((product) => (
                  <div key={product.name} className="single-suggested-product">
                    <Link to={`/products/${product.id}`}>
                      <div>
                        <img
                          style={{
                            width: "300px",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                          }}
                          src={product.imageURL}
                        />
                      </div>
                    </Link>

                    <div
                      className="product-details"
                      style={{ height: "150px" }}
                    >
                      <div className="other-details right">
                        <p>
                          <Link to={`/products/${product.category}`}>
                            {product.category}
                          </Link>
                        </p>
                        <p style={{ fontSize: "1.4rem", fontWeight: "900" }}>
                          {product.name}
                        </p>
                      </div>

                      <div className="price-div right">
                        <p style={{ fontSize: "0.8rem", margin: "0" }}>
                          Buy Now
                        </p>
                        <p
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: "900",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{ fontSize: "1rem", marginRight: "2px" }}
                          >
                            $
                          </span>
                          {product.price.toLocaleString("en-US")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Link to={`/products/${product.category}`}>
              <h4 className="collection-btn">View Collection</h4>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
