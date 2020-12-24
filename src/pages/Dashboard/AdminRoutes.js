import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import AdminProfile from "../AdminProfile/AdminProfile";

const AdminRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}`} exact component={AdminProfile} />
      </Switch>
    </div>
  );
};

export default AdminRoutes;