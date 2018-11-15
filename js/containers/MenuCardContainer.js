import { connect } from "react-redux";
import ARTrelloCard from "../ARTrelloCard";
import {setCardId, setMenuViewName} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    listId: ownProps.listId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //funcName: () => dispatch(actionName(paramters))
    setCardId: (cardId) => dispatch(setCardId(cardId)),
    setMenuViewName: (menuTitle) => dispatch(setMenuViewName(menuTitle))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ARTrelloCard);