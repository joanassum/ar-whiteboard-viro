'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
} from 'react-viro';
import {getCardMembers, getCheckLists} from "./backend/backendController";
import ARTrelloCard from "./ARTrelloCard";

class ARTrelloCardDetail extends Component {

    constructor() {
        super();
        this.state = {
            cardPosition: [-4, -0.5, 0],
            cardId: "",
            members:[],
            checkLists: []
        };
    }

    componentDidMount() {
        this.setState({
            cardId: this.props.cardId,
        });

        getCardMembers(this.props.cardId).then((response) => {
            this.setState({members: response});
        });

        getCheckLists(this.props.cardId).then((response) => {
            this.setState({
                checkLists: response
            });
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
                        text="Members: "
                    />
                    {
                        this.state.members.map((n, i) => {
                        return <ViroText style={styles.memberNameText} text={this.state.members[i].fullName}/>;
                        })
                    }
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
        flex: 0.35,
    },
    memberNameText: {
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'left',
        flex: 0.2,
    },
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: "#ffffffdd",
    },
    cardBack: {
        flexDirection: 'column',
        backgroundColor: "#ffffffdd",
        display: 'none',
    }
});

module.exports = ARTrelloCardDetail;