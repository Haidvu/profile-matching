import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { getNewToken } from "../Login/Login";
import axios from "axios";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //If login fails -> obtain new token, if that fails -> log the uer out.
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://18.213.74.196:8000/api/token/refresh/", {
          refresh: localStorage.getItem("refresh"),
        })
        .then((res) => {
          localStorage.setItem("token", res.data.access);
          setTimeout(getNewToken, 17900 * 1000); //Get new token approxiamtey every 4 hrs and 58 min.
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
