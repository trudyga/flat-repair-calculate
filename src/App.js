import React from "react";
import "./App.css";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import MainPageLayout from "views/MainPageLayout";

import AccountPage from "views/AccountPage";
import CalculationPage from "views/CaclulationPage";
import MainPage from "views/MainPage";

import RegisteredGuard from "containers/RegisteredGuard";

function App() {
  return (
    <Router>
      <MainPageLayout>
        <Switch>
          <Route path="/main">
            <MainPage />
          </Route>
        </Switch>
        <Switch>
          <Route path="/calculation">
            <RegisteredGuard>
              <CalculationPage />
            </RegisteredGuard>
          </Route>
        </Switch>
        <Switch>
          <Route path="/my-account">
            <AccountPage />
          </Route>
        </Switch>
      </MainPageLayout>
    </Router>
  );
}

export default App;
