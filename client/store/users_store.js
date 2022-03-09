import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const UPDATE = "UPDATE";

export const users = (state = [], action) => {
  if (action.type === "LOAD_USERS") {
    return action.users;
  }
  if (action.type === "CREATE_USER") {
    return [...state, action.user];
  }
  if (action.type === "DELETE_USER") {
    console.log(state);
    return state.filter((user) => user.id !== action.user.id);
  }
  if (action.type === "USER_HISTORY") {
    return action.userHistory;
  }
  if (action.type === UPDATE) {
    state = state.map((user) =>
      user.id !== action.orderDetails.userId ? user : action.user
    );
  }

  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get("/api/users")).data;
    dispatch({
      type: "LOAD_USERS",
      users,
    });
  };
};

const createUser = (user) => {
  return async (dispatch) => {
    const user_ = await axios.post(`/api/users`, {
      user,
    });
    dispatch({ type: "CREATE_USER", user_ });
  };
};

export const destroyUser = (userId) => {
  return async (dispatch) => {
    const user_ = await axios.delete(`/api/users/${userId}`);
    dispatch({ type: "DELETE_USER", user_ });
  };
};

export const editUser = (userId, user) => {
  return async (dispatch) => {
    const user_ = await axios.put(`/api/users/${userId}`, {
      user,
    });
    dispatch({ type: "UPDATE_USER", user_ });
  };
};

const _updateUser = (user) => ({ type: UPDATE, user });

export const updateUserThunk = (user, history) => {
  return async (dispatch) => {
    const updatedUser = (await axios.put(`/api/users/${user.id}`, user)).data;
    dispatch(_updateUser(updatedUser));
    // window.location.reload();
    // history.push(`/`);
  };
};

export const fetchHistory = (user) => {
  return async (dispatch) => {
    const userHistory = (await axios.get(`/api/users/order/history/${user.id}`))
      .data;
    dispatch({ type: "USER_HISTORY", userHistory });
  };
};
