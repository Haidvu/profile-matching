import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import ProjectsListTemplate from "../../components/CompanyPublic/ProjectListTemplate";
import StudentProfile from "../StudentProfile/StudentProfile";
import { StudentSearch } from "../StudentSearch/StudentSearch";
import StudentSelected from "../StudentSelected/StudentSelected";

const StudentRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={path} exact component={StudentProfile} />
        <Route path={`${path}/search`} exact component={StudentSearch} />

        <Route path={`${path}/projects`} exact component={StudentSelected} />


        <Route
          path={`${path}/projects/:project`}
          render={(props) => <ProjectsListTemplate {...props} />}
        />

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

export default StudentRoutes;
