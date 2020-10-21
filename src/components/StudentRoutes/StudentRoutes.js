import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import StudentProject from "../../pages/StudentProject/StudentProject";
import StudentProfile from "../../pages/StudentProfile/StudentProfile";

const StudentRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={path} exact component={StudentProfile} />
        <Route path={`${path}/projects`} exact component={StudentProject} />
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
