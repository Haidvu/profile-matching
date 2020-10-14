import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import StudentInfo from "./components/AccountInfo/StudentInfo";
import CompanyInfo from "./components/AccountInfo/CompanyInfo";
import ProtectedRoute from "./components/ProtecteRoute/ProtecteRoute";
import Profile from "./pages/Profile/Profile";
import Projects from "./pages/Projects/Projects";
import DataContextProvider from "./contexts/dataContext";
import ProtectedDashboard from "./components/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/studentinfo" component={StudentInfo} />
        <Route path="/companyinfo" component={CompanyInfo} />
        <DataContextProvider>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/projects" component={Projects} />
        </DataContextProvider>
        <Route path="*" component={NotFound} />
      </Switch>
      <ProtectedDashboard />
    </Router>
  );
};

export default App;
