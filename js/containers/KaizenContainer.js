import { connect } from "react-redux";
import KaizenBoardEntry from "../KaizenBoardEntry";
import {setCardId, setMenuViewName} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    menuTitle: state.mainReducer.menuTitle,
    cardId: state.mainReducer.cardId,
    viewCard: state.mainReducer.viewCard,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardId: (cardId) => dispatch(setCardId(cardId)),
    setMenuViewName: (menuTitle) => dispatch(setMenuViewName(menuTitle))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KaizenBoardEntry);