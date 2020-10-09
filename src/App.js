import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import StudentInfo from "./components/AccountInfo/StudentInfo"
import CompanyInfo from "./components/AccountInfo/CompanyInfo"

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup"  component={Signup} />
      <Route path="/studentinfo" component={StudentInfo} />
      <Route path="/companyinfo" component={CompanyInfo} />
    </Router>
  );
};

export default App;