
import React from 'react';
import {ACCESS_TOKEN} from 'settings/sessionStorage';
import {  Route,Redirect } from 'react-router-dom';
const ss =sessionStorage.getItem(ACCESS_TOKEN);
const ssOrgan =sessionStorage.getItem('organ');
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props =>
        (ss!==null&&ssOrgan!==null) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );