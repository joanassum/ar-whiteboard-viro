import { connect } from "react-redux";
import LoginScreen from "../LoginScreen";
import {setBoardId} from "../actions/mainActions";

const mapStateToProps = state => {
  return {
    //prop: state.mainReducer.parameter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //funcName: () => dispatch(actionName(paramters))
    setBoardId: (boardId) => dispatch(setBoardId(boardId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);