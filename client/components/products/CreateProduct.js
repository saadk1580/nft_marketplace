import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, fetchProducts } from "../../store";
import "./CreateProduct.css";
import { useHistory } from "react-router-dom";

export default function CreateProduct() {
  const [state, setstate] = useState({});
  const history = useHistory();

  const dispatch = useDispatch();
  return (
    <div className="add-product-page">
      <h1>Add Product</h1>

      <div>
        <ul className="add-product-cont">
          <form>
            <div
              className="add-product-text-cont"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="cp-name-cont">
                <label>Name: </label>
                <input
                  onChange={(e) => setstate({ ...state, name: e.target.value })}
                  type="text"
                  placeholder="Insert Name"
                />
                <button
                  className="ap-submit-button"
                  onClick={() => {
                    dispatch(createProduct(state, history));
                    dispatch(fetchProducts());
                  }}
                >
                  Submit Product
                </button>
              </div>

              <div className="cp-price-cont">
                <label>Price: </label>
                <input
                  placeholder="Insert Price"
                  onChange={(e) =>
                    setstate({ ...state, price: e.target.value })
                  }
                  type="number"
                />
              </div>
              <div className="cp-inv-cont">
                <label>Inventory: </label>
                <input
                  placeholder="Insert Inventory Count"
                  onChange={(e) =>
                    setstate({ ...state, inventory: e.target.value })
                  }
                  type="number"
                />
              </div>
              <div className="cp-cat-cont">
                <label>Category: </label>
                <input
                  placeholder="Insert Category"
                  onChange={(e) =>
                    setstate({ ...state, category: e.target.value })
                  }
                  type="text"
                />
              </div>

              <div className="cp-descrip-cont">
                <label>Description: </label>
                <input
                  placeholder="Insert Description"
                  onChange={(e) =>
                    setstate({ ...state, description: e.target.value })
                  }
                  type="text"
                />
              </div>

              <div className="cp-image-cont">
                <label>Image URL:</label>
                <input
                  placeholder="Paste Image URL"
                  onChange={(e) =>
                    setstate({ ...state, imageURL: e.target.value })
                  }
                  type="text"
                />
              </div>
            </div>
          </form>
        </ul>
      </div>
    </div>
  );
}
