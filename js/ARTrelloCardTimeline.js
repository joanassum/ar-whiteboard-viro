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
            widths.push(timeFraction * (w-2) + 2/actions.length); // to give width to very small values
        }

        for (var j = 0; j < columns.length; j++) {
            var row = [];
            for (var i = 0; i < actions.length; i++) {
                console.log()
                if (j == columns.indexOf(actions[i].column)) { // if column name is correct, draw bar
                    row.push(
                        <ViroFlexView
                            style={styles.barContainer}
                            height = {subHeight}
                            width = {widths[i]} />
                    );
                } else { // else empty container
                    row.push(
                        <ViroFlexView
                            style={styles.emptyContainer}
                            height = {subHeight}
                        width = {widths[i]}/>
                    );
                }
            }
            graph.push(<ViroFlexView
                style={styles.rowContainer}
                height = {subHeight}
                width = {w}>{row}</ViroFlexView>)
        }

        return <ViroFlexView
            style = {styles.graphContainer} height={h} width={w}>
            {graph}
        </ViroFlexView>
    };

    render() {
        return (
            <ViroNode
                position={this.state.cardPosition}
            >
                {this.createGraph(4, 8)}

            </ViroNode>
        );
    }
}


var styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    graphContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor:"#ffffff00"
    },
    barContainer: {
        backgroundColor: "#990022",
    },
    emptyContainer: {
        backgroundColor: "#00000000"
    }
});


module.exports = ARTrelloCardTimeline;