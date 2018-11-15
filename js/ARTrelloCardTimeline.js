'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
    ViroAnimations,
    ViroImage
} from 'react-viro';
import {getCardHistory,getBoard} from "./backend/backendController";

class ARTrelloCardTimeline extends Component {

    constructor() {
        super();
        this.state = {
            timelinePosition: [-5, 0, 0],
            cardInfo: "",
            columns: [],
            cardHistory: []
        };
        this._onClick = this._onClick.bind(this);
        this._onStart = this._onStart.bind(this);
        this._onAnimationFinished = this._onAnimationFinished.bind(this);
    }

    componentDidMount() {
        this.setState({
            timelinePosition: this.props.timelinePosition,
            cardId: this.props.cardId,
            columns: [],
            cardHistory: []
        });

        getCardHistory(this.props.cardId)
            .then((response) => {
                this.setState({cardHistory : response});
        });

        getBoard(this.props)
            .then((response => {
                this.setState({columns : response.map(x => x["name"]).reverse()})
        }));
    }

    createGraph = (height, width) -> {
        var graph = [];
        var actions = this.state.cardHistory;
        var columns = this.state.columns;
        var subHeight = height/columns.length;
        var widths = [];
        var firstDate = Date.parse(actions[0].date);
        var finalDate = Date.parse(actions[actions - 1].date);
        var datePadding = finalDate + 86400000; // one day padding time for graph niceness to indicate final column
        var totalTime = datePadding - firstDate;

        for (var i = 0; i < actions.length; i++){
            var actionDate = Date.parse(actions[i].date);
            var nextDate;
            if (i != actions.length - 1){
                nextDate = Date.parse(actions[i+1].date);
            } else {
                nextDate = datePadding;
            }
            var timeFraction = (nextDate - actionDate)/totalTime;
            widths.push(timeFraction * width);
        }


        for (var i = 0; i < actions.length; i++){
            for (var j = 0; j < columns.length; j++){
                if (j == columns.indexOf(actions[i].name)) { // if column name is correct, draw bar
                    graph.push(<ViroFlexView
                        style={styles.barContainer} height={subHeight} width={widths[j]}>
                    </ViroFlexView>);
                } else { // else empty container
                    graph.push(<ViroFlexView
                        style={styles.emptyContainer} height={subHeight} width={widths[j]}>
                    </ViroFlexView>);
                }
            }
        }

        return graph
    };

    render() {
        return (
            <ViroNode
                position={this.state.cardPosition}
            >
                {this.createGraph(5,20)}
            </ViroNode>
        );
    }

    _onStart() {

    }
    _onAnimationFinished() {
        this.setState({
            runAnimation: false
        });
    }

    _onClick() {

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
    barContainer: {
        flexDirection: 'column',
        backgroundColor: "#ff00ffdd",
    },
    emptyContainer:{
        flexDirection: 'column',
        backgroundColor: "#ffffffdd",
        opacity: 0,
    },
    cardBack: {
        flexDirection: 'column',
        backgroundColor: "#ffffffdd",
        display: 'none',
    }
});


module.exports = ARTrelloCardTimeline;