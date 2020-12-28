import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import AdminProfile from "../AdminProfile/AdminProfile";
//import AdminMap from "../AdminMap/AdminMap";
import AdminMapTest from "../AdminMap/test";


const AdminRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}`} exact component={AdminProfile} />
       {/* <Route path={`${path}/Maps`} exact component={AdminMap} /> */}


        <Route path={`${path}/Maps2`} exact component={AdminMapTest} />
        


      </Switch>
    </div>
  );
};

export default AdminRoutes;