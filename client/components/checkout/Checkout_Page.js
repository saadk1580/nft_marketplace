import React, { Component } from "react";
import { connect } from "react-redux";
// import { updateUserThunk } from "../store";
import Checkout_Products from "./Checkout_Products";
import { Link } from "react-router-dom";
import Stripe from "./payments/Stripe";
import "./Checkout.css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      address: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  async componentDidMount() {
    if (this.props.auth.id) {
      this.setState({
        id: this.props.auth.id,
        first_name: this.props.auth.first_name,
        last_name: this.props.auth.last_name,
        email: this.props.auth.email,
        address: this.props.auth.address || "",
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth.id !== prevState.id) {
      this.setState({
        id: this.props.auth.id,
        first_name: this.props.auth.first_name,
        last_name: this.props.auth.last_name,
        email: this.props.auth.email,
        address: this.props.auth.address || "",
      });
    }
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    ev.preventDefault();
    try {
      await this.props.updateUser({ ...this.state });
      window.location.reload();
    } catch (er) {
      console.log(er);
    }
  }

  render() {
    const user = this.state;
    const { first_name, last_name, email, address } = this.state;
    const { onChange, onSave } = this;
    return (
      <div className="checkout-page">
        <div className="stuff-on-this-page">
          <div className="firstTwo">
            <Checkout_Products />
          </div>

          <h1 className="confirm-header">Confirm Details</h1>
        </div>
        {console.log(this.state)}
        <Stripe suser={user} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (user) => {
      dispatch(updateUserThunk(user, history));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Checkout);
