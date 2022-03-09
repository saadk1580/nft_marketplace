// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import "./Stripe.css";
import { useSelector } from "react-redux";
import axios from "axios";
import history from "history";
import { Link } from "react-router-dom";
import { updateUserThunk } from "../../../store";
import { connect } from "react-redux";

// import "../styles/2-Card-Detailed.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87BBFD",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  name,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      name={name}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      cardComplete: false,
      processing: false,
      paymentMethod: null,
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email,
      address: props.user.address,
      id: props.user.id,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.auth.id !== prevState.id) {
  //     this.setState({
  //       id: props.user.id,
  //       first_name: props.user.first_name,
  //       last_name: props.user.last_name,
  //       email: props.user.email,
  //       address: props.user.address || "",
  //     });
  //   }
  // }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
    // console.log(ev.target.name, ev.target.value);
  }

  // async onSave(ev) {
  //   ev.preventDefault();
  //   try {
  //     await this.props.updateUser({ ...this.state });
  //     // window.location.reload();
  //   } catch (er) {
  //     console.log(er);
  //     // this.setState({ error: er.response.data.error.errors[0].message });
  //   }
  // }

  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("update1", this.props.updateUser);

    await this.props.updateUser({ ...this.state });
    const { stripe, elements, user } = this.props;
    const { email, name, error, cardComplete } = this.state;
    // await updateUser({ ...this.state });

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    if (error) {
      card.focus();
      return;
    }

    if (cardComplete) {
      this.setState({ processing: true });
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email,

        name,
      },
    });

    this.setState({ processing: false });

    if (payload.error) {
      this.setState({ error: payload.error });
    } else {
      this.setState({ paymentMethod: payload.paymentMethod });
    }

    //DC add

    if (user.id) {
      await axios.put(`/api/users/order/checkout/${user.id}`);
    } else {
      localStorage.removeItem("cart");
    }
  };

  reset = () => {
    window.location.href = "/"; // similar behavior as clicking on a link
  };

  render() {
    const {
      error,
      processing,
      paymentMethod,
      first_name,
      last_name,
      email,
      address,
    } = this.state;
    const { stripe, user } = this.props;
    const { onChange, onSave } = this;
    // console.log(this.props);
    // console.log(name);
    return paymentMethod ? (
      <div className="Result">
        <div className="ResultTitle" role="alert">
          Payment successful
        </div>
        <div className="ResultMessage">
          <Link onClick={this.reset}>
            Thank you for your support! This is a Fullstack Academy Project so
            you unfortunately cannot spend any money here. Anyway here is a
            random number {paymentMethod.id}
            <h1>Click Here to Keep Shopping</h1>
          </Link>
        </div>
        <ResetButton onClick={this.reset} />
      </div>
    ) : (
      <div>
        <form className="Form" onSubmit={this.handleSubmit}>
          <fieldset className="FormGroup">
            <Field
              label="First:"
              id="first_name"
              type="first_name"
              name="first_name"
              onChange={this.onChange}
              // placeholder='First Name'
              required
              autoComplete={this.props.user.first_name}
              value={this.state.first_name}
            />
            <Field
              label="Last:"
              id="last_name"
              type="last_name"
              name="last_name"
              onChange={this.onChange}
              // placeholder={this.props.user.last_name}
              required
              autoComplete={this.props.user.last_name}
              value={this.state.last_name}
              // onChange={(event) => {
              //   this.setState({ last_name: event.target.value });
              // }}
            />
            <Field
              label="Email:"
              id="email"
              type="email"
              name="email"
              onChange={this.onChange}
              // placeholder={this.props.user.email}
              required
              autoComplete={this.props.user.email}
              value={this.state.email}
            />
            <Field
              label="Address:"
              id="Address"
              type="Address"
              name="address"
              onChange={this.onChange}
              // placeholder={this.props.user.address}
              required
              autoComplete={this.props.user.address}
              value={this.state.address}
            />
          </fieldset>
          <fieldset className="FormGroup">
            <CardField
              onChange={(event) => {
                this.setState({
                  error: event.error,
                  cardComplete: event.complete,
                });
              }}
            />
          </fieldset>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <SubmitButton
            processing={processing}
            error={error}
            disabled={
              !stripe ||
              !this.props.user.first_name ||
              !this.props.user.last_name ||
              !this.props.user.email ||
              !this.props.user.address
            }
          >
            Pay
          </SubmitButton>
        </form>
      </div>
    );
  }
}

const InjectedCheckoutForm = ({ user, updateUser }) => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          user={user}
          updateUser={updateUser}
        />
      )}
    </ElementsConsumer>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Stripe = (props) => {
  const user = useSelector((state) => state.auth);
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} user={user}>
        <InjectedCheckoutForm user={user} updateUser={props.updateUser} />
      </Elements>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (user) => {
      dispatch(updateUserThunk(user, history));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Stripe);

// export default Stripe;
