'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
    ViroImage,
} from 'react-viro';
import {getCardMembers, getCheckLists, getTimeLineGraph} from "./backend/backendController";

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

        getTimeLineGraph(this.props.cardId).then((response) => {
          console.log("fetched: " + response);
            this.setState({timeLineGraph: response});
        });
    }

    render() {
        console.log(this.state.checkLists);
        let checkLists = (
            this.state.checkLists.map ((n, i) => {
                return(
                    <ViroFlexView style={{flexDirection: 'column'}} height={1} width={3}>
                        <ViroFlexView style={{flexDirection: 'column'}} height={1} width={3}>
                            <ViroText style={styles.prodDescriptionText} text={n.name + ": "}/>
                        </ViroFlexView>
                        {this.state.checkLists[i].checkItems.map((m, j) => {
                            return (
                                <ViroFlexView style={{flexDirection: 'column'}} height={1} width={3}>
                                     <ViroText style={styles.prodDescriptionText} text={
                                         m.name + "(" +
                                         m.state + ")"
                                     }/>
                                </ViroFlexView>
                            );
                        })}
                    </ViroFlexView>

                );
            })
        );
        console.log(checkLists);
        return (
            <ViroNode position={this.state.cardPosition}>
                <ViroFlexView style={styles.titleContainer} height={5.5} width={6}>
                    <ViroFlexView style={{flexDirection: 'column'}} height={12} width={3}>
                        <ViroImage
                            style={styles.prodDescriptionText}
                            source={{uri: this.state.timeLineGraph}}
                        />
                        </ViroFlexView>
                    <ViroFlexView style={{flexDirection: 'column'}} height={1} width={3}>
                        <ViroFlexView style={{flexDirection: 'row'}} height={1} width={3}>
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
                        {checkLists}
                    </ViroFlexView>
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
