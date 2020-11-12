import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import CompanyProject from "../CompanyProject/CompanyProject";
import StudentsList from "../../components/StudentPublic/StudentsList";

const CompanyRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={path} exact component={CompanyProfile} />
        <Route path={`${path}/projects`} exact component={CompanyProject} />
        <Route path={`${path}/search`} exact component={StudentsList} />
        {/* <Route
          path={`${path}/*`}
          render={() => (
            <Redirect
              to={{
                pathname: "/whoTouchMySpaghet",
              }}
            />
          )}
        /> */}
      </Switch>
    </div>
  );
};

export default CompanyRoutes;
