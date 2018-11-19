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

function Checkbox(props) {
  const state = props.state;
  if (state == "complete") {
    return (
      <ViroImage
        style={styles.prodDescriptionImage}
        source={require("./res/complete.jpg")}
        scale= {[0.5, 0.5, 0.5]}
      />
    );
  }
  return (
    <ViroImage
      style={styles.prodDescriptionImage}
      source={require("./res/incomplete.jpg")}
      scale= {[0.5, 0.5, 0.5]}
    />
  );
}

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
                    <ViroFlexView style={{flexDirection: 'column'}} height={4} width={3}>
                        <ViroFlexView style={{flexDirection: 'column'}} height={0.7} width={3}>
                            <ViroText style={styles.prodDescriptionText} text={n.name + ": "}/>
                        </ViroFlexView>
                        {this.state.checkLists[i].checkItems.map((m, j) => {
                            return (
                                <ViroFlexView style={{flexDirection: 'row'}} height={0.7} width={3}>
                                    <Checkbox state={m.state} />
                                    <ViroText style={styles.prodDescriptionText} text={
                                        m.name
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
                    <ViroFlexView style={{flexDirection: 'column', padding: .1}} height={12} width={3}>
                        <ViroImage
                            style={styles.prodDescriptionImage}
                            source={{uri: this.state.timeLineGraph}}
                        />
                        </ViroFlexView>
                    <ViroFlexView style={{flexDirection: 'column', padding: .1}} height={1} width={3}>
                        <ViroFlexView style={{flexDirection: 'row'}} height={0.7} width={3}>
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
    prodDescriptionImage: {
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
        backgroundColor: "#ffffdd",
    },
    cardBack: {
        flexDirection: 'column',
        backgroundColor: "#ffffdd",
        display: 'none',
    }
});

module.exports = ARTrelloCardDetail;
