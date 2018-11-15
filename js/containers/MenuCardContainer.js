import { connect } from "react-redux";
import ARTrelloCard from "../ARTrelloCard";
import {setCardId} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    listId: ownProps.listId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //funcName: () => dispatch(actionName(paramters))
    setCardId: (cardId) => dispatch(setCardId(cardId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ARTrelloCard);