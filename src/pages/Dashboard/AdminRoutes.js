import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import AdminProfile from "../AdminProfile/AdminProfile";
import AdminMap from "../AdminMap/AdminMap";
import AdminStudentView from "../../components/StudentPublic/AdminStudentView";
import AdminCompanyView from "../../components/CompanyPublic/AdminCompanyView";

const AdminRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}`} exact component={AdminProfile} />
        <Route path={`${path}/Maps`} exact component={AdminMap}/> 
        <Route path={`${path}/search/:id`} component={AdminStudentView} />
        <Route
          path={`${path}/projects/:project`}
          render={(props) => <AdminCompanyView {...props} />}
        />
      </Switch>
    </div>
  );
};

export default AdminRoutes;