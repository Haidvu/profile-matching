import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import StudentInfo from "./components/AccountInfo/StudentInfo";
import CompanyInfo from "./components/AccountInfo/CompanyInfo";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtecteRoute/ProtecteRoute";
import Profile from "./pages/Profile/Profile";
import Projects from "./pages/Projects/Projects";
import DataContextProvider from "./contexts/dataContext";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/studentinfo" component={StudentInfo} />
      <Route path="/companyinfo" component={CompanyInfo} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <DataContextProvider>
        <ProtectedRoute path="/dashboard/profile" component={Profile} />
        <ProtectedRoute path="/dashboard/projects" component={Projects} />
      </DataContextProvider>
    </Router>
  );
};

export default App;
