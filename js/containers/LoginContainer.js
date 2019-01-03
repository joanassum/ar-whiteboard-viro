import { connect } from "react-redux";
import LoginScreen from "../LoginScreen";
import {setUserId} from "../actions/mainActions";

const mapStateToProps = state => {
  return {
    //prop: state.mainReducer.parameter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //funcName: () => dispatch(actionName(paramters))
    setUserId: (userId) => dispatch(setUserId(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);