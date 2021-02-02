import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// authentication
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { setCurrentContact } from "./actions/chatActions";

// redux
import { Provider } from "react-redux";
import store from "./store";

// components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Error from "./components/error/Error";
import Account from "./components/auth/Account";

import { getContacts } from "./actions/userActions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getContacts());

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login 
    window.location.href = "./login";
  }
}

if(sessionStorage.contact) {
  const contact = JSON.parse(sessionStorage.contact);
  store.dispatch(setCurrentContact(contact));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* <PrivateRoute exact path="/account" component={Account} /> */}
              <Route component={Error} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;