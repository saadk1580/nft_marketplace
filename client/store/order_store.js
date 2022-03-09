import axios from "axios";
import { fetchProducts } from "./index.js";

const LOAD_ORDERS = "LOAD_ORDERS";
const ADD_TO_ORDER = "ADD_TO_ORDER";
const LOAD_ORDER_DETAILS = "LOAD_ORDER_DETAILS";
const UPDATE_ORDER = "UPDATE_ORDER";
const DELETE_ORDER = "DELETE_ORDER";

const _loadOrders = (orders) => {
  return { type: LOAD_ORDERS, orders };
};

const _addToOrder = (order) => {
  return { type: ADD_TO_ORDER, order };
};

const _deleteOrder = (order) => {
  return { type: DELETE_ORDER, order };
};

const _updateOrder = (order) => {
  return { type: UPDATE_ORDER, order };
};

const _loadOrderDetails = (orderDetails) => {
  return { type: LOAD_ORDER_DETAILS, orderDetails };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    const orders = (await axios.get("/api/orders")).data;
    dispatch(_loadOrders(orders));
  };
};

export const addToOrder = (order, user, product) => {
  return async (dispatch) => {
    if (order.id) {
      order.type = "add";
      order = (await axios.put(`/api/orders/${order.id}`, order)).data;
      dispatch(_addToOrder(order));
      dispatch(fetchOrderDetails(user));
    } else {
      //for guest users
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        //check if the product already exists
        const productIdx = cart.products.findIndex(
          (p) => p.productId === order.productId
        );
        const productToAdd = cart.products[productIdx];
        //create association if new, otherwise add to quantity
        if (productIdx === -1) {
          order.orderproduct = { itemCount: order.totalItems };
          order.id = product.id;
          order.price = product.price;
          order.inventory = product.inventory;
          order.description = product.description;
          order.imageURL = product.imageURL;
          cart.products.push(order);
        } else {
          productToAdd.orderproduct.itemCount += order.totalItems;
        }
        cart.totalPrice += order.totalPrice;
        cart.totalItems += order.totalItems;
      } else {
        cart = { products: [], totalPrice: 0, totalItems: 0 };
        order.orderproduct = { itemCount: order.totalItems };
        order.id = product.id;
        order.price = product.price;
        order.inventory = product.inventory;
        order.description = product.description;
        order.imageURL = product.imageURL;
        cart.products.push(order);
        cart.totalPrice = order.totalPrice;
        cart.totalItems = order.totalItems;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(_addToOrder(cart));
    }
  };
};

export const updateOrder = (order, orderUpdates, product) => {
  return async (dispatch) => {
    if (order.id) {
      // order.type = "update";
      // order.productId = product.id;
      // order.orderToUpdateId = orderUpdates.id;
      // order.orderUpdateTotalItems = orderUpdates.totalItems;
      // order.orderUpdateTotalPrice = orderUpdates.totalPrice;
      // console.log("thunk, order before axios call", order);
      // order = (await axios.put(`/api/orders/${order.id}`, order)).data;
      // console.log("thunk, order after axios call", order);
      // dispatch(_updateOrder(order));
      // console.log("update thunk - orderDetails var - before any calls", order);
      order.type = "update";
      order.productId = product.id;
      order.orderToUpdateId = orderUpdates.id;
      order.orderUpdateTotalItems = orderUpdates.totalItems;
      // console.log(
      //   "update thunk - orderDetails var - after all calls, before axios call",
      //   order
      // );
      order = (await axios.put(`/api/orders/${order.id}`, order)).data;
      // console.log("update thunk - orderDetails var - after axios call", order);
      const orderDetails = (await axios.get(`/api/users/order/${order.userId}`))
        .data;
      // console.log(
      //   "update thunk - OGOG orderDetails var - after axios call",
      //   order
      // );
      // console.log("----------end of call--------");
      dispatch(_updateOrder(order));
      dispatch(fetchOrderDetails(orderDetails));
      dispatch(fetchProducts());
    } else {
      //for guest user's cart update
      let cart = JSON.parse(localStorage.getItem("cart"));
      //find the product to update
      const productIdx = cart.products.findIndex(
        (p) => p.productId === product.id
      );
      const productToUpdate = cart.products[productIdx];

      //find the difference between previous itemCount and the new itemCount
      const prevCount = Number(productToUpdate.orderproduct.itemCount);

      const diff = orderUpdates.totalItems - prevCount;

      productToUpdate.orderproduct.itemCount = orderUpdates.totalItems;
      productToUpdate.totalPrice += diff * product.price;
      productToUpdate.totalItems += diff;
      cart.totalPrice += diff * product.price;
      cart.totalItems += diff;

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(_updateOrder(cart));
    }
  };
};

export const deleteOrder = (order, product) => {
  return async (dispatch) => {
    if (order.id) {
      order.type = "delete";
      order.productId = product.id;
      order = (await axios.put(`/api/orders/${order.id}`, order)).data;
      dispatch(_deleteOrder(order));
      dispatch(fetchProducts());
    } else {
      //for guest user's cart update
      let cart = JSON.parse(localStorage.getItem("cart"));
      //find the product to update
      const productIdx = cart.products.findIndex(
        (p) => p.productId === product.id
      );
      const productToUpdate = cart.products[productIdx];
      //find the difference between previous itemCount and the new itemCount
      const prevCount = Number(productToUpdate.orderproduct.itemCount);
      order.products.forEach((p) => {
        if (p.id === product.id) cart.products.splice(productIdx, 1);
      });
      cart.totalPrice -= prevCount * product.price;
      cart.totalItems -= prevCount;
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(fetchProducts());
    }
  };
};

export const fetchOrderDetails = (user) => {
  return async (dispatch) => {
    if (user.id) {
      const orderDetails = (await axios.get(`/api/users/order/${user.id}`))
        .data;
      dispatch(_loadOrderDetails(orderDetails));
    } else {
      //for guest user
      const cart = JSON.parse(localStorage.getItem("cart"));
      dispatch(_loadOrderDetails(cart));
    }
  };
};

export const completeOrder = (user) => {
  return async (dispatch) => {
    if (user.id) {
      await axios.get(`/api/users/order/checkout/${user.id}`);
      const newOrder = await axios.get(`/api/users/order/${user.id}`);
      dispatch(_loadOrderDetails(newOrder));
    } else {
      //for guest user
      localStorage.removeItem("cart");
      localStorage.setItem("cart", {});
      dispatch(_loadOrderDetails(cart));
    }
  };
};

export const orders = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders;
    case LOAD_ORDER_DETAILS:
      return [...state].map((order) =>
        order.userId === action.orderDetails.userId
          ? action.orderDetails
          : order
      );
    case DELETE_ORDER:
      return [...state].map((order) => {
        if (order.id === action.order.id) {
          order.totalItems = action.order.totalItems;
          order.totalPrice = action.order.totalPrice;
          order.productId = null;
          order.products = order.products.filter(
            (product) => product.id !== action.order.productId
          );
          return order;
        }
        return order;
      });
    case ADD_TO_ORDER:
      return [...state].map((order) => {
        if (order.userId === action.order.userId) {
          order.totalItems += action.order.totalItems;
          order.totalPrice += action.order.totalPrice;
          return order;
        }
        return order;
      });
    case UPDATE_ORDER:
      return [...state].map((order) => {
        if (order.userId === action.order.userId) {
          // console.log("action - update order", action.order);
          // console.log("OG order - update order", order);

          const productOrder = order.products.find(
            (product) => product.id === action.order.productId
          );

          productOrder.orderproduct.itemCount =
            action.order.orderUpdateTotalItems;

          // console.log("productOrder", productOrder);
          order.totalItems = action.order.totalItems;
          order.totalPrice = action.order.totalPrice;
          return order;
        }
        return order;
      });
    default:
      return state;
  }
};
