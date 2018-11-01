'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
    ViroAnimations,
} from 'react-viro';

class ARTrelloCard extends Component {

    constructor() {
        super();
        this.state = {
            cardPosition: [0, -0.5, 0],
            cardInfo: {},
            backCards: false,
            runAnimation: false,
            mainAnimation: "frontToBack",
        };
        this._onClick = this._onClick.bind(this);
        this._onStart = this._onStart.bind(this);
        this._onAnimationFinished = this._onAnimationFinished.bind(this);
    }

    componentDidMount() {
        this.setState({
            cardPosition: this.props.cardPosition,
            cardInfo: this.props.cardInfo,
            backCards: false,
            runAnimation: false,
            mainAnimation: "frontToBack"
        });
    }

    render() {
        ViroAnimations.registerAnimations({
            backToFront:{
                properties:{rotateY:"+=180.0",
                    positionX: this.state.cardPosition[0],
                    positionY: this.state.cardPosition[1],
                    positionZ: this.state.cardPosition[2],
                    opacity: 1.0},
                easing:"EaseInEaseOut",
                duration: 1000}
        });
        return (
            <ViroNode
                position={this.state.cardPosition}
                animation={{name : this.state.mainAnimation, run : this.state.runAnimation, loop : false,
                            onFinish:this._onAnimationFinished, onStart: this._onStart}}
            >
                <ViroFlexView style={styles.titleContainer} height={0.4} width={1.5}
                              onClick={this._onClick}   >
                        <ViroText
                            style={styles.prodDescriptionText}
                            text={this.state.cardInfo.name}
                        />
                </ViroFlexView>

                <ViroFlexView style={styles.titleContainer} height={2.5} width={3}
                              rotation={[0,180,0]} onClick={this._onClick} ignoreEventHandling={!this.state.backCards}>
                    <ViroText
                        style={styles.prodDescriptionText}
                        text="test"
                    />
                </ViroFlexView>

            </ViroNode>
        );
    }

    _onStart() {
        this.setState({
            backCards: !this.state.backCards,
        });
    }
    _onAnimationFinished() {
        this.setState({
            runAnimation: false
        });
    }

    _onClick() {
        this.setState({
            mainAnimation: this.state.backCards ? "backToFront" : "frontToBack",
            // if current state is to hide cards, then we want to show them
            runAnimation: true
        });
    }
}

ViroAnimations.registerAnimations({
    frontToBack:{
        properties:{rotateY:"+=180.0",
                    positionZ: 1,
                    positionX: -2,
                    positionY: 2,
                    opacity: 1.0},
        easing:"EaseInEaseOut",
        duration: 1000},

    scaleAndRotate:{properties:{rotateY: "+=90", positionZ: "-3"}, duration:1000},
    rotate:{properties:{rotateZ:"+=90"}, duration:10000},
    animateImage:{properties:{scaleX:1, scaleY:.6, scaleZ:1, opacity: 1},
        easing:"Bounce", duration: 50000},
});

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
    cardBack: {
        flexDirection: 'column',
        backgroundColor: "#ffffffdd",
        display: 'none',
    }
});

module.exports = ARTrelloCard;