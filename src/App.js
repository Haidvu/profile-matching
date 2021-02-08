import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import ResetPage from "./components/ResetPassword/ResetPage";
import Signup from "./components/Signup/Signup";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReportBug from "./pages/ReportBug/ReportBug"
import AboutDevelopers from "./pages/AboutDevelopers/AboutDevelopers";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/lost-password" component={ResetPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/accountInfo" component={AccountInfo} />
        <Route path="/developers" component={AboutDevelopers} />
        <Route path="/report-bug" component={ReportBug} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
