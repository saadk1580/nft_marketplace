import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToOrder, editProduct } from "../../store/index.js";
import { Link } from "react-router-dom";
import "./Single_Cat.css";

const SingleCategory_Page = () => {
  const state = useSelector((state) => state);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = state.auth;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("");

  const logos = {
    azuki: {
      logo:
        "https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s0",
      banner:
        "https://lh3.googleusercontent.com/GEJoxKVf43_eo52fKBkG_NJJp9Xs7uWWwZ3wR1O2T8xNXSZpKHfgBENZjZC704JyUGQZEGGKTsYU627KR5TxxWaaFNFWbRnpIDS2hQ=s2500",
    },

    cryptoPunks: {
      banner:
        "https://static.frieze.com/files/styles/hero_image/public/article/main/CryptoPunks-%281%29.jpg?itok=Og2-9kvw",
      logo:
        "https://lh3.googleusercontent.com/WpIg88Xi0iu1O8hiDUL_yoQpk4VL_PbaaSZftv_DGNE195Mojw2QswDyoqXrhd8YFegmzM_kSNi4hIN5KY9J3xcLYA=w600",
    },

    cloneX: {
      banner:
        "https://lh3.googleusercontent.com/4elUtz8UyFYDH34vDxd4hpQX8S-EdkFq8s9ombkuQTDBWLwHvsjRM_RXWT2zX8Vt2bAiO2BHslwN57FyTW1JIn_FyFI0BsZfmvmeJQ=s2500",
      logo:
        "https://lh3.googleusercontent.com/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg=s0",
    },

    tastyBones: {
      logo:
        "https://lh3.googleusercontent.com/pFx2k4GbEd30FbIPOGagqG646QGUk-0Ns8n6kSgozxY4aJSI2AYm1a_Acvu0jngeIx7hSeZeZTHLKUiUEt9qXfE-DWRmJyZJQ_AnKA=s0",
      banner:
        "https://lh3.googleusercontent.com/5-Se3_BW72_N9cGEZubPYXfWdiaVrMpG-EQ7B4RgyHhjTDl9OB_u9lbSgjCL0Sy9gR-H3vRRYiKtm3uNGPOidD1huYlf-6z94_Um62I=s2500",
    },
    theLadies: {
      logo:
        "https://lh3.googleusercontent.com/YMrHbC7LU59e4ELZafsXdK0i9zfgv91xv1bMwJcHYZOXpA2OGzRu3DxdDvR2RCQ7P2rg4jGAgkReLqK91WhVLnVbY8Z5d9IJjG9XYA=s0",
      banner:
        "https://lh3.googleusercontent.com/L6Bee-eDBwkopxYCQYpabj_S7AHW8y-XKatFWMyqXShi3UbMlhj-Lu6rBdH1Z50n-i3IE-C26wD2a968ek2HAn7L2obfbyVEqykQIuk=h600",
    },
    Grumpets: {
      logo:
        "https://lh3.googleusercontent.com/IAN2rnLcbIDp6EqwUtWO4rjezva8nNnAbDsGnpdJQLsk2TxuvzhcAgsDUBtawV-lp3SAr5-gM9yltoDIgM0l-tzv0bPvpWddujY0=s0",
      banner:
        "https://lh3.googleusercontent.com/GKHwL1ihHAD2E_eVjm-jTvYGlQzY2_SDmgfMy-OixWMO3WAieP9c_YK_40Bw9ru-3-D0Al8oJuto2YNU7bf8OsVoBp8ENqpo5szV=h600",
    },
    littleLemonFriends: {
      logo:
        "https://lh3.googleusercontent.com/SSHi3LwWt7tnEIV_pvuL56-Uyr6ajDrIpFZjNn8VpCx9esjY3hkRz4MV_yUa82bdzt5eUdnTizeBB615CPKkqHEED-71dLrczPs6npY=s130",
      banner:
        "https://lh3.googleusercontent.com/iDHK-buU0uL9GqIqG-MNhPaB1kJlMfXcJsRqA2OYrsyINcWZUStevjAGRIMAfZWF5YbE4aHhzKGj0cvWEHZdU1Bv2Ri3abWxy1RvbN8=h600",
    },
    The_Metascapes: {
      logo:
        "https://lh3.googleusercontent.com/0tM6wrF0VmfVUOpVmpeAnPJC4nOdZqIhRoHENwE7pxsu_0i4DJ66pWRd_jRAUJf2_yJJx3U10wXfh24-Z3cebAp1NgH1iHpiMP04Qw=s0",
      banner:
        "https://lh3.googleusercontent.com/f4Kl5L8EfIvLrMQg2pd9v6Jp-6JyPGtKJubAOhhshNRUCwoMnaWI65_S2N9CludL7TbnAXQGgO1ZI63340GQTP-dpUi28Yw8L3r_ig=h600",
    },
  };

  const userOrderId =
    user.id &&
    state.orders
      .filter((order) => order.userId === user.id)
      .map((order) => order.id)[0];

  const orderToAdd = {
    id: userOrderId,
    totalItems,
    totalPrice,
    productId,
  };

  let category;

  switch (pathname) {
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

  let banner;
  switch (category) {
    case "Crypto Punks":
      banner = logos.cryptoPunks.banner;
      break;
    case "Azuki":
      banner = logos.azuki.banner;
      break;
    case "Clone X":
      banner = logos.cloneX.banner;
      break;
    case "Tasty Bones XYZ":
      banner = logos.tastyBones.banner;
      break;
    case "The Metascapes":
      banner = logos.The_Metascapes.banner;
      break;
    case "The Ladies":
      banner = logos.theLadies.banner;
      break;
    case "Grumpets":
      banner = logos.Grumpets.banner;
      break;
    case "Little Lemon Friends":
      banner = logos.littleLemonFriends.banner;
      break;
    default:
      break;
  }

  const products = useSelector((state) => state.products).filter(
    (product) => product.category === category
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        justifyContent: "center",
      }}
    >
      <div className="Image--content">
        <div
          className="banner"
          style={{
            display: "flex",
            backgroundImage: `url(${banner})  `,
            width: "100vw",
            height: "220px",
            backgroundSize: "cover",
            minWidth: "1150px",
            marginBottom: "50px",
            // backgroundRepeat: "no-repeat ",
          }}
        ></div>
      </div>
      <h1 style={{ color: "#000000", textAlign: "center", fontSize: "3rem" }}>
        {category}
      </h1>
      <div className="single-category-container">
        <div className="single-category-products">
          {products.map((product) => (
            <div>
              <div
                className="product"
                key={product.name}
                style={{ border: " 1px solid #333333" }}
              >
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
                  >
                    {/* <img className="product-img" src={product.imageURL} /> */}
                  </div>
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
                      {product.price}
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
      </div>
    </div>
  );
};

export default SingleCategory_Page;
