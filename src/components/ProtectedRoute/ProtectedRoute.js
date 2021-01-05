import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { getNewToken } from "../Login/Login";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    getNewToken();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") && localStorage.getItem("slug") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
