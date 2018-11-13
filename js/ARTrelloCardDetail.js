'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
} from 'react-viro';

class ARTrelloCardDetail extends Component {

    constructor() {
        super();
        this.state = {
            cardPosition: [-4, -0.5, 0]
        };
    }

    componentDidMount() {
        this.setState({
            cardInfo: this.props.cardInfo,
        });
    }

    render() {
        return (
            <ViroNode
                position={this.state.cardPosition}
            >
                <ViroFlexView style={styles.titleContainer} height={2.5} width={3}>
                    <ViroText
                        style={styles.prodDescriptionText}
                        text="test"
                    />
                </ViroFlexView>

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
    cardBack: {
        flexDirection: 'column',
        backgroundColor: "#ffffffdd",
        display: 'none',
    }
});

module.exports = ARTrelloCardDetail;