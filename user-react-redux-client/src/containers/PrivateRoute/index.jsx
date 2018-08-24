import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute  from "../../components/PrivateRoute";
import  * as authActions  from '../../actions/authActions';

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.authState
});

const mapDispatchToProps = dispatch => ({
 mappedAuthenticate: (token,history) => dispatch(authActions.authenticate(token,history)),
})

export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);