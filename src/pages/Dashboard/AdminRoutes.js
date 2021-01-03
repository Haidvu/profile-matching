import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import AdminProfile from "../AdminProfile/AdminProfile";
// import AdminMap from "../AdminMap/AdminMap";

const AdminRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}`} exact component={AdminProfile} />
        {/* <Route path={`${path}/Maps`} exact component={AdminMap} />  */}
      </Switch>
    </div>
  );
};

export default AdminRoutes;