import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {

  const isAuth = isAuthenticated

  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  access: state.auth.access

});
export default connect(mapStateToProps, {})(PrivateRoute);
// export default PrivateRoute