import { connect } from "react-redux";
import ViroEntry from "../ViroEntry";
import {checkTestAction} from "../actions/mainActions";

const mapStateToProps = state => {
  return {
    test: state.mainReducer.test
  };
};

const mapDispatchToProps = dispatch => {
  return {
    testAction: () => dispatch(checkTestAction("Tested"))
  };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViroEntry);