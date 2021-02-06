import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import AdminProfile from "../AdminProfile/AdminProfile";
import AdminMap from "../AdminMap/AdminMap";
import AdminStudentView from "../../components/StudentPublic/AdminStudentView";
import AdminCompanyView from "../../components/CompanyPublic/AdminCompanyView";
import AdminCompanyProjects from "../AdminCompanyProjects/AdminCompanyProjects";
import AdminCompanySignUp from '../../components/AdminCompanySignUp/AdminCompanySignUp';

const AdminRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}`} exact component={AdminProfile} />
        <Route path={`${path}/Maps`} exact component={AdminMap}/> 
        <Route path={`${path}/CompanyProjects`} exact component={AdminCompanyProjects} />
        <Route path={`${path}/search/:id`} component={AdminStudentView} />
        <Route
          path={`${path}/projects/:project`}
          render={(props) => <AdminCompanyView {...props} />}
        />
        <Route path={`${path}/Company/SignUp`} exact component={AdminCompanySignUp}/>
      </Switch>
    </div>
  );
};

export default AdminRoutes;