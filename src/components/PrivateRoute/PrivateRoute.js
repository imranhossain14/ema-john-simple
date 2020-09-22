import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    // amra context ta use kore log in user er information ta check korte pari
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Route
        {...rest}
        render={({ location }) =>
        // condition to check is he logged in user? jodi thake tahole private route er children er kase tumi chole jaw
          loggedInUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;