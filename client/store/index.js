import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import auth from "./auth";
const { products } = require("./product_store");
const { users } = require("./users_store");
const { orders } = require("./order_store");

const reducer = combineReducers({ auth, products, users, orders });
const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./order_store";
export * from "./product_store";
export * from "./users_store";
