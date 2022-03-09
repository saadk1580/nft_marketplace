import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToOrder, destroyProduct, editProduct } from "../../store/index.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Products.css";
import Product_Edit from "./Product_Edit.js";
import Pagination from "./Pagination.js";

const Products = () => {
  const path = useLocation().pathname.split("/").pop();
  console.log(path);
  // console.log(useLocation());

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const user = state.auth;
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("");
  const [show, setShow] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const userOrderId = state.orders
    .filter((order) => order.userId === user.id)
    .map((order) => order.id)[0];

  const orderToAdd = {
    id: userOrderId,
    totalItems,
    totalPrice,
    productId,
  };

  const EditForm = ({ id }) => {
    return <Product_Edit id={id} disableEditForm={(res) => setShow(res)} />;
  };

  const SortArrayCategory = (x, y) => {
    if (x.category < y.category) {
      return -1;
    }
    if (x.category > y.category) {
      return 1;
    }
    return 0;
  };

  const SortArrayName = (x, y) => {
    if (x.name < y.name) {
      return -1;
    }
    if (x.name > y.name) {
      return 1;
    }
    return 0;
  };

  const SortArrayPriceHighLow = (x, y) => {
    return y.price - x.price;
  };

  const SortArrayPriceLowHigh = (x, y) => {
    return x.price - y.price;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexofFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts =
    path === "a-z"
      ? state.products
          .sort(SortArrayName)
          .slice(indexofFirstProduct, indexOfLastProduct)
      : path === "low-high"
      ? state.products
          .sort(SortArrayPriceLowHigh)
          .slice(indexofFirstProduct, indexOfLastProduct)
      : path === "high-low"
      ? state.products
          .sort(SortArrayPriceHighLow)
          .slice(indexofFirstProduct, indexOfLastProduct)
      : state.products
          .sort(SortArrayCategory)
          .slice(indexofFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const logos = [
    {
      banner:
        "https://static.frieze.com/files/styles/hero_image/public/article/main/CryptoPunks-%281%29.jpg?itok=Og2-9kvw",
      logo:
        "https://lh3.googleusercontent.com/WpIg88Xi0iu1O8hiDUL_yoQpk4VL_PbaaSZftv_DGNE195Mojw2QswDyoqXrhd8YFegmzM_kSNi4hIN5KY9J3xcLYA=w600",
    },

    {
      banner:
        "https://lh3.googleusercontent.com/4elUtz8UyFYDH34vDxd4hpQX8S-EdkFq8s9ombkuQTDBWLwHvsjRM_RXWT2zX8Vt2bAiO2BHslwN57FyTW1JIn_FyFI0BsZfmvmeJQ=s2500",
      logo:
        "https://lh3.googleusercontent.com/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg=s0",
    },

    {
      logo:
        "https://lh3.googleusercontent.com/pFx2k4GbEd30FbIPOGagqG646QGUk-0Ns8n6kSgozxY4aJSI2AYm1a_Acvu0jngeIx7hSeZeZTHLKUiUEt9qXfE-DWRmJyZJQ_AnKA=s0",
      banner:
        "https://lh3.googleusercontent.com/5-Se3_BW72_N9cGEZubPYXfWdiaVrMpG-EQ7B4RgyHhjTDl9OB_u9lbSgjCL0Sy9gR-H3vRRYiKtm3uNGPOidD1huYlf-6z94_Um62I=s2500",
    },
    {
      logo:
        "https://lh3.googleusercontent.com/YMrHbC7LU59e4ELZafsXdK0i9zfgv91xv1bMwJcHYZOXpA2OGzRu3DxdDvR2RCQ7P2rg4jGAgkReLqK91WhVLnVbY8Z5d9IJjG9XYA=s0",
      banner:
        "https://lh3.googleusercontent.com/L6Bee-eDBwkopxYCQYpabj_S7AHW8y-XKatFWMyqXShi3UbMlhj-Lu6rBdH1Z50n-i3IE-C26wD2a968ek2HAn7L2obfbyVEqykQIuk=h600",
    },
    {
      logo:
        "https://lh3.googleusercontent.com/IAN2rnLcbIDp6EqwUtWO4rjezva8nNnAbDsGnpdJQLsk2TxuvzhcAgsDUBtawV-lp3SAr5-gM9yltoDIgM0l-tzv0bPvpWddujY0=s0",
      banner:
        "https://lh3.googleusercontent.com/GKHwL1ihHAD2E_eVjm-jTvYGlQzY2_SDmgfMy-OixWMO3WAieP9c_YK_40Bw9ru-3-D0Al8oJuto2YNU7bf8OsVoBp8ENqpo5szV=h600",
    },
    {
      logo:
        "https://lh3.googleusercontent.com/SSHi3LwWt7tnEIV_pvuL56-Uyr6ajDrIpFZjNn8VpCx9esjY3hkRz4MV_yUa82bdzt5eUdnTizeBB615CPKkqHEED-71dLrczPs6npY=s130",
      banner:
        "https://lh3.googleusercontent.com/iDHK-buU0uL9GqIqG-MNhPaB1kJlMfXcJsRqA2OYrsyINcWZUStevjAGRIMAfZWF5YbE4aHhzKGj0cvWEHZdU1Bv2Ri3abWxy1RvbN8=h600",
    },
    {
      logo:
        "https://lh3.googleusercontent.com/0tM6wrF0VmfVUOpVmpeAnPJC4nOdZqIhRoHENwE7pxsu_0i4DJ66pWRd_jRAUJf2_yJJx3U10wXfh24-Z3cebAp1NgH1iHpiMP04Qw=s0",
      banner:
        "https://lh3.googleusercontent.com/f4Kl5L8EfIvLrMQg2pd9v6Jp-6JyPGtKJubAOhhshNRUCwoMnaWI65_S2N9CludL7TbnAXQGgO1ZI63340GQTP-dpUi28Yw8L3r_ig=h600",
    },
    {
      logo:
        "https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s0",
      banner:
        "https://lh3.googleusercontent.com/GEJoxKVf43_eo52fKBkG_NJJp9Xs7uWWwZ3wR1O2T8xNXSZpKHfgBENZjZC704JyUGQZEGGKTsYU627KR5TxxWaaFNFWbRnpIDS2hQ=s2500",
    },
    {
      logo:
        "https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s0",
      banner:
        "https://lh3.googleusercontent.com/GEJoxKVf43_eo52fKBkG_NJJp9Xs7uWWwZ3wR1O2T8xNXSZpKHfgBENZjZC704JyUGQZEGGKTsYU627KR5TxxWaaFNFWbRnpIDS2hQ=s2500",
    },
  ];

  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((count) =>
  //       count < logos.length - 1 ? count + 1 : count - (logos.length - 1)
  //     );
  //   }, 3000);

  //   return () => clearInterval(interval);
  // });

  return (
    <div className="products-container">
      <div>{show === "show" && <EditForm id={productId} />}</div>

      <p
        style={{
          color: "#ffffff",
          textAlign: "center",
          margin: "50px",
          fontSize: "3rem",
        }}
      >
        Discover, buy, showcase top selling NFTs
      </p>

      <div>
        <div
          className="bannerImg"
          style={{
            background: `url(${logos[count].banner}) no-repeat 50% 50%`,
          }}
        >
          <div className="blur"></div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "10px",
        }}
      >
        <ul className="sort-ul">
          <li>
            <NavLink
              exact
              className="sort-not-selected"
              activeClassName="sort-selected"
              to="/products/sorted/a-z"
              onClick={() => setCurrentPage(1)}
            >
              Sort by A-Z
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              className="sort-not-selected"
              activeClassName="sort-selected"
              to="/products/sorted/price/low-high"
              onClick={() => setCurrentPage(1)}
            >
              Sort by Price (Low - High)
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              className="sort-not-selected"
              activeClassName="sort-selected"
              to="/products/sorted/price/high-low"
              onClick={() => setCurrentPage(1)}
            >
              Sort by Price (High - Low)
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="products">
        {currentProducts.map((product) => (
          <div>
            <div className="product" key={product.name}>
              <Link to={`/products/${product.id}`}>
                <div
                  className=""
                  style={{
                    backgroundImage: `url(${product.imageURL}) `,
                    width: "360px",
                    height: "360px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                ></div>
              </Link>

              <div className="product-details">
                <div className="other-details right">
                  <p>
                    <Link to={`/products/${product.category}`}>
                      {product.category}
                    </Link>
                  </p>
                  <p style={{ fontSize: "1.4rem", fontWeight: "900" }}>
                    {product.name}
                  </p>

                  {user.isAdmin === true ? (
                    <div className="edit-delte-btns">
                      {" "}
                      <button
                        onClick={() => {
                          setProductId(product.id);
                          setShow("show");
                          document.body.style.overflow = "hidden";
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(destroyProduct(product.id))}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="price-div right">
                  <p style={{ fontSize: "0.8rem", margin: "0" }}>Buy Now</p>
                  <p
                    style={{
                      fontSize: "1.3rem",
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
                  className="addToCart1"
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
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={state.products.length}
        paginate={paginate}
        currentPage={currentPage}
        path={path}
      />
    </div>
  );
};

export default Products;
