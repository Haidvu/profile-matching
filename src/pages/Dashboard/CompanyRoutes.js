import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import CompanyProjectList from "../CompanyProject/CompanyProjectList";
import CompanyProjectTemplate from "../CompanyProject/CompanyProjectTemplate";

import CompanyProjectCreate from "../CompanyProject/CompanyProjectCreate";



const CompanyRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={path} exact component={CompanyProfile} />
        <Route path={`${path}/projects`} exact component={CompanyProjectList} />

        <Route path={`${path}/projects/create`} exact component={CompanyProjectCreate} />

        <Route path={`${path}/projects/project1`} exact component={CompanyProjectTemplate} />


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
