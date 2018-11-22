import { connect } from "react-redux";
import ARTrelloCard from "../ARTrelloCard";
import {setCardId, setMenuOption, setMenuViewName} from "../actions/mainActions";

const mapStateToProps = (state, ownProps) => {
  return {
    listID: ownProps.listID,
    disArr: ownProps.disArr,
    listSet: ownProps.listSet,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCardId: (cardId) => dispatch(setCardId(cardId)),
    setMenuViewName: (menuTitle) => dispatch(setMenuViewName(menuTitle)),
    setMenuOption: (option) => dispatch(setMenuOption(option)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ARTrelloCard);