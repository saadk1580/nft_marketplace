import axios from "axios";

const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const DELETE_ORDER = "DELETE_ORDER";
const UPDATE_ORDER = "UPDATE_ORDER";

const _loadProducts = (products) => {
  return { type: LOAD_PRODUCTS, products };
};

const _editProduct = (order, product) => {
  return { type: EDIT_PRODUCT, order, product };
};

const _destroyProduct = (product) => {
  return { type: DELETE_PRODUCT, product };
};

const _createProduct = (product) => {
  return { type: CREATE_PRODUCT, product };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get("/api/products")).data;
    dispatch(_loadProducts(products));
  };
};

export const createProduct = (product, history) => {
  return async (dispatch) => {
    const product_ = await axios.post(`/api/products`, product);
    history.push("/");
    dispatch(_createProduct, product_);
  };
};

export const destroyProduct = (productId) => {
  return async (dispatch) => {
    const product_ = await axios.delete(`/api/products/${productId}`);
    dispatch(_destroyProduct(product_));
    dispatch(fetchProducts());
  };
};

export const editProduct = (order, product) => {
  return async (dispatch) => {
    if (order.totalItems) {
      product.inventory -= order.totalItems;
    }
    product = (await axios.put(`/api/products/${product.id}`, product)).data;

    dispatch(_editProduct(order, product));
    dispatch(fetchProducts());
  };
};

export const products = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    case EDIT_PRODUCT:
      return state;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case CREATE_PRODUCT:
      return [...state, action.product];
    case DELETE_ORDER:
      return [...state].map((product) => {
        if (product.id === action.order.productId) {
          const amountToAddToInv = action.order.products.find(
            (product) => product.id
          ).orderproduct.itemCount;
          product.inventory += amountToAddToInv;
          return product;
        }
        return product;
      });
    case UPDATE_ORDER:
      return [...state].map((product) => {
        if (product.id === action.order.productId) {
          // console.log("nugget action order", action.order);

          const OGCount = action.order.products.find(
            (product) => product.id === action.order.productId
          ).orderproduct.itemCount;
          // console.log("OGCount", OGCount);

          const difference = action.order.orderUpdateTotalItems - OGCount;
          // //quantity increase === positive num
          // //quantity decrease === negative num

          product.inventory = product.inventory -= difference;
          // console.log("difference", difference);
          // console.log("OG Product", product);

          return product;
        }
        return product;
      });

    default:
      return state;
  }
};
