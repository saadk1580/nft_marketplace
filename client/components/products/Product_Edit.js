import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { editProduct } from "../../store";
import "./ProductEdit.css";

export default function Product_Edit({ id, disableEditForm }) {
  // const productId = useParams().id;
  let productId = id;

  const products = useSelector((state) => state.products);
  const product = products.filter((product) => product.id === productId)[0];

  const [state, setstate] = useState({
    id: productId,
    ...product,
  });
  // console.log(productId);

  const dispatch = useDispatch();
  return (
    <div className="edit-container">
      <form className="edit-form">
        <p
          style={{
            margin: "10px",
            background: "#000000",
            width: "20px",
            color: "#ffffff",
            textAlign: "center",
          }}
          onClick={() => {
            disableEditForm("");
            document.body.style.overflow = "visible";
          }}
        >
          X
        </p>
        <div className="edit-form-item">
          {" "}
          <div className="edit-form-item">
            <label>Top Bid: </label>
            <input
              defaultValue={product.price}
              onChange={(e) => setstate({ ...state, price: e.target.value })}
              type="number"
            />
          </div>
          <div className="edit-form-item">
            <label>Inventory: </label>
            <input
              defaultValue={product.inventory}
              onChange={(e) =>
                setstate({ ...state, inventory: e.target.value })
              }
              type="number"
            />
          </div>
          <div className="edit-form-item">
            <label>Name: </label>
            <input
              defaultValue={product.name}
              onChange={(e) => setstate({ ...state, name: e.target.value })}
              type="text"
            />
          </div>
          {/* <div className="edit-form-item">
            <label>Description: </label>
            <input
              defaultValue={product.description}
              onChange={(e) =>
                setstate({ ...state, description: e.target.value })
              }
              type="text"
            />
          </div> */}
          <div className="edit-form-item">
            <label>Category: </label>
            <input
              defaultValue={product.category}
              onChange={(e) => setstate({ ...state, category: e.target.value })}
              type="text"
            />
          </div>
          <div className="edit-form-item">
            <button
              onClick={() => {
                disableEditForm("");
                dispatch(editProduct({}, state));
                document.body.style.overflow = "visible";
              }}
            >
              Submit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
