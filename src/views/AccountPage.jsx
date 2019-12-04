import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link, Switch, Route, Redirect } from "react-router-dom";

import RegisterForm from "containers/RegisterForm";
import AuthForm from "containers/AuthForm";

function detectAuth() {
  return localStorage.getItem("token") !== null;
}

const AccountPage = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => detectAuth());

  function register(opts) {
    const endpoint = "http://rayn934-001-site1.ctempurl.com/register";

    var form_data = new FormData();
    for (var key in opts) {
      form_data.append(key, opts[key]);
    }
    return fetch(endpoint, {
      method: "post",
      body: form_data
    })
      .then(function(response) {
        console.log("response", response);
        return response.text();
      })
      .then(function(data) {
        return data;
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  function auth(opts) {
    const endpoint = "http://rayn934-001-site1.ctempurl.com/authorize";

    var form_data = new FormData();
    for (var key in opts) {
      form_data.append(key, opts[key]);
    }

    return fetch(endpoint, {
      method: "post",
      body: form_data
    })
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        console.log(data);

        return JSON.parse(`${data}`);
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  function regiserUser(values) {
    return register(values)
      .then(() => auth(values))
      .then(data => {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
      });
  }

  function authUser(values) {
    return auth(values).then(data => {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.username);
      setIsAuthenticated(true);
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  }

  const redirectPath = localStorage.getItem("redirect");

  if (isAuthenticated && redirectPath !== null) {
    localStorage.removeItem("redirect");

    return <Redirect to={redirectPath} />;
  }

  return (
    <>
      {redirectPath !== null && (
        <span>Вам необхідно увійти до системи для розрахунку вартості</span>
      )}
      {!isAuthenticated && (
        <Switch>
          <Route path="/my-account/register">
            <RegisterForm onSubmit={values => regiserUser(values)} />
            <Link to="/my-account/auth">Вже є аккаунт? Авторизуйтесь</Link>
          </Route>
          <Route path="/my-account/auth">
            <AuthForm onSubmit={values => authUser(values)} />
            <Link to="/my-account/register">Немає аккаунту?</Link>
          </Route>

          <Route>
            <RegisterForm onSubmit={values => regiserUser(values)} />
            <Link to="/my-account/auth">Вже є аккаунт? Авторизуйтесь</Link>
          </Route>
        </Switch>
      )}

      {isAuthenticated && (
        <Link to="/" type="button" onClick={() => logout()}>
          Вийти з аккаунту
        </Link>
      )}
    </>
  );
};

AccountPage.propTypes = {};

export default AccountPage;
