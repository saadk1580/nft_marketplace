import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Previous_Orders_Page.css";

const monthConv = (str) => {
  switch (str) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    default:
      return "December";
  }
};

const Previous_Orders_Page = () => {
  const userOrders = useSelector((state) => state.users);
  const user = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);

  return (
    <div className="singleProduct">
      <h1>Previous Orders</h1>
      <div>
        {userOrders.length > 0 ? (
          userOrders.map((order) => {
            const orderNum = order.id.split("-");
            const date = order.createdAt.slice(0, -14);
            const year = Number(date.split("-")[0]);
            const month = Number(date.split("-")[1]);
            const day = Number(date.split("-")[2]);

            return (
              <ul key={order.id} className="single-order-cont">
                <div className="order-header">
                  <div className="placed-cont">
                    <div>ORDER PLACED</div>
                    <div className="date">
                      {monthConv(month)} {day}, {year}
                    </div>
                  </div>
                  <div className="total-cont">
                    <div>TOTAL</div>
                    <div className="total">
                      ${(order.totalPrice * 1.07).toLocaleString("en-US")}
                    </div>
                  </div>

                  <div className="ship-cont">
                    <div>SOLD TO</div>
                    <div className="total">
                      {user.first_name} {user.last_name}
                    </div>
                  </div>

                  <div className="order-num-cont">
                    <div>Order # {orderNum[0]}</div>
                  </div>
                </div>

                {order.products.map((product) => {
                  const productInfo = products.find(
                    (prod) => prod.id === product.id
                  );
                  return (
                    <div key={product.id} className="single-prod-cont">
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
                          Price per Item: $
                          {productInfo.price.toLocaleString("en-US")}
                        </div>
                        <div>Quantity: {product.orderproduct.itemCount}</div>
                      </div>
                    </div>
                  );
                })}
              </ul>
            );
          })
        ) : (
          <h1
            style={{
              color: "white",
            }}
          >
            No previous orders exist
          </h1>
        )}
      </div>

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

export default Previous_Orders_Page;
// connect((state) => state
