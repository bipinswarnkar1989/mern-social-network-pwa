import { connect } from 'react-redux';
import AddPost from '../../components/AddPost';
import * as appActions from '../../actions/appActions';

const mapStateToProps = (state) => {
    return {
       appState:state.appState,
       auth:state.authState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       mappedupdateAppTitle: title => dispatch(appActions.updateAppTitle(title)),
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
) (AddPost);