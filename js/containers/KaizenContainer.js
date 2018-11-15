import { connect } from "react-redux";
import KaizenBoardEntry from "../KaizenBoardEntry";

const mapStateToProps = (state) => {
  return {
    cardId: state.mainReducer.cardId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //funcName: () => dispatch(actionName(paramters))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KaizenBoardEntry);