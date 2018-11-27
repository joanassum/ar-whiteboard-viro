import { connect } from "react-redux";
import KaizenBoardEntry from "../KaizenBoardEntry";
import {setCardId, setMenuViewName, unsetCardId, setMenuOption, setListID, setLabelID, setLabelName, setBoardMetric, unsetBoardMetric, setGraphType} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    menuTitle: state.mainReducer.menuTitle,
    option: state.mainReducer.option,
    cardId: state.mainReducer.cardId,
    boardId: state.mainReducer.boardId,
    cardChosen: state.mainReducer.cardChosen,
    boardMetricChosen: state.mainReducer.boardMetricChosen,
    titlePicked: state.mainReducer.titlePicked,
    listID: state.mainReducer.listID,
    listSet: state.mainReducer.listSet,
    labelID: state.mainReducer.labelID,
    labelName: state.mainReducer.labelName,
    labelSet: state.mainReducer.labelSet,
    graphType: state.mainReducer.graphType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardId: (cardId) => dispatch(setCardId(cardId)),
    setMenuViewName: (menuTitle) => dispatch(setMenuViewName(menuTitle)),
    setMenuOption: (option) => dispatch(setMenuOption(option)),
    setLabelID: (labelID) => dispatch(setLabelID(labelID)),
    setLabelName: (labelName) => dispatch(setLabelName(labelName)),
    setListID: (listID) => dispatch(setListID(listID)),
    setGraphType: (graphType) => dispatch(setGraphType(graphType)),
    unsetCardId: () => dispatch(unsetCardId()),
    setBoardMetric: () => dispatch(setBoardMetric()),
    unsetBoardMetric: () => dispatch(unsetBoardMetric()),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KaizenBoardEntry);