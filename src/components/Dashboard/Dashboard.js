import React from "react";
import { withRouter } from "react-router-dom";

const Dashboard = (props) => {
  const { location } = props;
  if (
    location.pathname.match(/profile/) ||
    location.pathname.match(/projects/)
  ) {
    //This is where the side menu and logged in navbar would go
    return <div>Side Menu and AppBar</div>;
  }

  return null;
};

const ProtectedDashboard = withRouter(Dashboard);

export default ProtectedDashboard;
