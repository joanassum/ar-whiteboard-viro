import { connect } from "react-redux";
import KaizenBoardEntry from "../KaizenBoardEntry";
import {setCardId, setMenuViewName, unsetCardId, setMenuOption, setListID} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    menuTitle: state.mainReducer.menuTitle,
    option: state.mainReducer.option,
    cardId: state.mainReducer.cardId,
    boardId: state.mainReducer.boardId,
    cardChosen: state.mainReducer.cardChosen,
    titlePicked: state.mainReducer.titlePicked,
    listID: state.mainReducer.listID,
    listSet: state.mainReducer.listSet,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardId: (cardId) => dispatch(setCardId(cardId)),
    setMenuViewName: (menuTitle) => dispatch(setMenuViewName(menuTitle)),
    setMenuOption: (option) => dispatch(setMenuOption(option)),
    setListID: (listID) => dispatch(setListID(listID)),
    unsetCardId: () => dispatch(unsetCardId()),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KaizenBoardEntry);