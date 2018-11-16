import { connect } from "react-redux";
import KaizenBoardEntry from "../KaizenBoardEntry";
import {setCardId, setMenuViewName, unsetCardId} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    menuTitle: state.mainReducer.menuTitle,
    cardId: state.mainReducer.cardId,
    boardId: state.mainReducer.boardId,
    cardChosen: state.mainReducer.cardChosen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardId: (cardId) => dispatch(setCardId(cardId)),
    setMenuViewName: (menuTitle) => dispatch(setMenuViewName(menuTitle)),
    unsetCardId: () => dispatch(unsetCardId()),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KaizenBoardEntry);