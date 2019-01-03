import { connect } from "react-redux";
import LoginScreen from "../LoginScreen";
import {setUserId, setURL} from "../actions/mainActions";

const mapStateToProps = state => {
  return {
    userId: state.mainReducer.currentMemberID,
    userName: state.mainReducer.currentMemberName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setURL: (url) => dispatch(setURL(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);