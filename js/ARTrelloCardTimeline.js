'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
    ViroAnimations,
    ViroImage,
    ViroPolygon
} from 'react-viro';
import {getCardHistory, getBoardById} from "./backend/backendController";

class ARTrelloCardTimeline extends Component {

    constructor() {
        super();
        this.state = {
            historyLoaded : false,
            columnsLoaded : false,
            timelinePosition: [-5, 0, 0],
            cardInfo: "",
            columns: [],
            cardHistory: []
        };
    }

    componentDidMount() {
        this.setState({
            timelinePosition: this.props.timelinePosition,
            cardId: "rfkPc9DA",//this.props.cardId,
            columns: [],
            cardHistory: []
        });
        getCardHistory("rfkPc9DA")
                .then((response) => {
                    this.setState({
                        cardHistory: response,
                        historyLoaded: true
                    });

                });
        getBoardById("1WQBI6bD")//this.props.boardId")
                .then((response => {
                    this.setState({
                        columns: response.map(x => x["name"]).reverse(),
                        columnsLoaded: true
                    })
                }));
    }

    createGraph = (h, w) => {
        if (!this.state.historyLoaded || !this.state.columnsLoaded) {
            return (<ViroFlexView style={styles.titleContainer} height={0.4} width={1.5}>
                <ViroText
                    text="loading graph"
                />
            </ViroFlexView>)
        }
        var graph = [];
        var actions = this.state.cardHistory;
        console.log(actions);
        var columns = this.state.columns;
        console.log(columns);
        var subHeight = h / columns.length;
        var widths = [];
        var firstDate = Date.parse(actions[0].date);
        var finalDate = Date.parse(actions[actions.length - 1].date);
        var datePadding = finalDate + 100000; // one day padding time for graph niceness to indicate final column
        var totalTime = datePadding - firstDate;


        for (var i = 0; i < actions.length; i++) {
            var actionDate = Date.parse(actions[i].date);
            var nextDate;
            if (i != actions.length - 1) {
                nextDate = Date.parse(actions[i + 1].date);
            } else {
                nextDate = datePadding;
            }
            var timeFraction = (nextDate - actionDate) / totalTime;
            widths.push(timeFraction * w /2 + w /(actions.length* 2)); // to give width to very small values
        }

        for (var j = 0; j < columns.length; j++) {
            var row = [];
            for (var i = 0; i < actions.length; i++) {
                console.log(i,j,actions[i].column,columns[j],actions[i].date);
                if (j == columns.indexOf(actions[i].column)) { // if column name is correct, draw bar
                    console.log("bar found");
                    row.push(
                        <ViroFlexView
                            style={styles.barContainer}
                            height = {subHeight}
                            width = {widths[j]} />
                    );
                } else { // else empty container
                    row.push(
                        <ViroFlexView
                            style={styles.emptyContainer}
                            height = {subHeight}
                        width = {widths[j]}/>
                    );
                }
            }
            graph.push(<ViroFlexView
                style={styles.rowContainer}
                height = {subHeight}
                width = {w}>
                {row}
            </ViroFlexView>)
        }

        return graph
    };

    render() {
        return (
            <ViroNode
                position={this.state.cardPosition}
            >
                <ViroFlexView
                    style = {styles.graphContainer} height={4} width={8}>
                    {this.createGraph(4, 8)}
                </ViroFlexView>

            </ViroNode>
        );
    }
}


var styles = StyleSheet.create({

    rowContainer: {
        flex : 1,
        flexDirection: 'row',
        alignContent: 'flex-start',
        backgroundColor:"#440000"
    },
    graphContainer: {
        flex : 1,
        flexDirection: 'column',
        alignContent: 'flex-start',
        backgroundColor:"#444444"
    },
    barContainer: {
        backgroundColor: "#0000ff",
    },
    emptyContainer: {
        backgroundColor: "#ffffdd"
    }
});


module.exports = ARTrelloCardTimeline;