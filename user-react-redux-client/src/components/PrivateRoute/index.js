import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Auth from '../../utils/auth';
import Spinner from '../Spinner';

const authObj = new Auth();

{ /*const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render = {
        props => auth.isLoggedIn === true ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login"/>
            )

    } />
);
*/}



class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded:false,
            isAuthenticated: false
        };
    }

    componentWillMount() {
        this.authenticate().then(() => {
            console.log('Authenticated');
        });
    }
    
    authenticate = async () => {
        let token  = await authObj.getToken();
        await this.props.mappedAuthenticate(token,this.props.history);
    }
    render() {
        const { component:Component, ...rest } = this.props;
        const { isLoggedIn, isLoading, loaded } = this.props.auth;
        if (!loaded) return (<Spinner/>)
        return (
            <Route
            {...rest}
            render={props => {
              return isLoggedIn ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                  }}
                />
              )
            }}
          />
        );
    }
}

PrivateRoute = withRouter(PrivateRoute);

export default PrivateRoute;