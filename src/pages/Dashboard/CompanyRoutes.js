import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import CompanyProjectList from "../CompanyProject/CompanyProjectList";


import CompanyProjectCreate from "../CompanyProject/CompanyProjectCreate";
import CompanyProjectTemplate from "../CompanyProject/CompanyProjectTemplate";



const CompanyRoutes = () => {
  let { path } = useRouteMatch();

  
  return (
    <div>
      <Switch>
        <Route path={path} exact component={CompanyProfile} />
        <Route path={`${path}/projects`} exact render={(props) => <CompanyProjectList {...props} />}/>


       
        <Route path={`${path}/projects/:project`} render={(props) => <CompanyProjectTemplate {...props}/>}/>
   

        <Route path={`${path}/project/create`} exact component={CompanyProjectCreate} />
     

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
