import React, {PureComponent} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { apiUrl } from '../config/constants';

class PrivateRoute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reqDone: false,
      isAuth: false,
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/session`, {
      method: 'get',
      credentials: 'include'
    })
      .then(response => {
        this.setState({ reqDone: true, isAuth: response.status === 201 ? true : false });
      });
  }
  
  render() {
    const { component: Component, ...rest } = this.props;
    const { reqDone, isAuth } = this.state;
    if (!reqDone) return null;
    return (
      <Route {...rest} render={props => (
        isAuth ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}/>
        )
      )}/>
    );
  }
}

export default PrivateRoute;