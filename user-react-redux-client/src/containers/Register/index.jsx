import { connect } from 'react-redux';
import Register from '../../components/Register';
import * as authActions from '../../actions/authActions';

const  mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToprops = (dispatch) => {
    return {
      mappedRegister:(payload,history) => dispatch(authActions.registerUser(payload,history)),
    }
}

export default connect(
    mapStateToProps,mapDispatchToprops
)(Register);