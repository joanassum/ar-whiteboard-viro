'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
} from 'react-viro';
import {getFilteredCardMap} from "./backend/backendController";

class ARTrelloCard extends Component {

    constructor() {
        super();
        this.state = {
          cardLoaded: false,
          cardss: [{
            cardName: "Loading....", cardId: "Loading...."
          }],
          cardClick: false,
          cardObj: {
            cardName: "Loading....", cardId: "Loading...."
          },
        };
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
      getFilteredCardMap(this.props.listID , this.props.labelID).then((response) => {
        this.setState({cards: response, cardLoaded: true});
      });
    }

    onClick(position, source, cardObj){
      this.setState({cardClick: true, cardObj: cardObj});
      if(this.state.cardLoaded){
        //Dispatch action for cardId
        this.props.setCardId(cardObj.cardId);
        this.props.setMenuViewName(cardObj.cardName);
        this.props.setMenuOption("Main Menu");
      }
    }

    render() {

        return (
            <ViroNode
                position={this.props.disArr}
            >
              {
                (this.state.cardLoaded && this.props.listSet)? (
                  this.state.cards.map((n, i) => {
                    return (
                      <ViroFlexView
                        position={[0, (-0.5 * (i)), 0]}
                        style={styles.titleContainer}
                        height={0.4}
                        width={1.75}
                        key={n.cardId}
                        onClick={(pos, src, cardObj = n) => this.onClick(pos, src, cardObj)}>
                        <ViroText
                          style={styles.prodDescriptionText}
                          text={n.cardName}
                          key={n.cardId}
                        />
                      </ViroFlexView>);
                  })
                ) : null
              }
            </ViroNode>
        );
    }
}

var styles = StyleSheet.create({
    prodDescriptionText: {
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'left',
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'column',
        backgroundColor: "#ffffffdd",
    },
});

module.exports = ARTrelloCard;