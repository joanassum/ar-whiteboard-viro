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
            historyLoaded: false,
            columnsLoaded: false,
            timelinePosition: [-5, 0, 0],
            cardInfo: "",
            columns: [],
            cardHistory: []
        };
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
                this.setState({
                    cardHistory: response,
                    historyLoaded: true
                });

            });
        getBoardById(this.props.boardId)//this.props.boardId")
            .then((response => {
                this.setState({
                    columns: response.map(x => x["name"]).reverse(),
                    columnsLoaded: true
                })
            }));
    }

    createDiagram = (h, w) => {
        if (!this.state.historyLoaded || !this.state.columnsLoaded) {
            return (<ViroFlexView style={styles.titleContainer} height={0.4} width={1.5}>
                <ViroText
                    text="Loading diagram..."
                />
            </ViroFlexView>)
        }

        let actions = this.state.cardHistory;
        let columns = this.state.columns;

        let graphHeight = h * 3 / 4;
        let graphWidth = w * 2 / 3;

        let graph = this.createGraph(graphHeight, graphWidth, actions, columns);
        let xAxisWidth = w * 1 / 3;

        let xAxis = this.createXAxis(graphHeight, xAxisWidth, columns);
        let yAxisHeight = h * 1 / 8;
        let yAxis = this.createYAxis(yAxisHeight, graphWidth, w, xAxisWidth);

        let titleHeight = h * 1 / 8;
        let titlePadding = <ViroFlexView
                style = {styles.emptyContainer}
                height = {titleHeight}
                width = {xAxisWidth}
        />;
        let title = <ViroFlexView
                style = {styles.emptyContainer}
                height = {titleHeight}
                width = {w-xAxisWidth}
        >
            <ViroText
                    style = {styles.titleStyle}
                    height = {titleHeight}
                    width = {w-xAxisWidth}
                    text = "Timeline of column movement"
            />
        </ViroFlexView>;

        return <ViroFlexView style={styles.diagramContainer} height={h} width={w}>
            {titlePadding}
            {title}
            {xAxis}
            {graph}
            {yAxis}
        </ViroFlexView>

    };

    createXAxis = (graphHeight, xAxisWidth, columns) => {
        let halfWidth = xAxisWidth / 2;
        let labels = [];
        labels.push(
            <ViroText
                text="Columns"
                height={graphHeight}
                width={halfWidth}
                textAlignVertical='center'
            />
        );
        let lineWidth = halfWidth / 10;
        for (let i = 0; i < columns.length; i++) {
            labels.push(
                <ViroText
                    text={columns[i]}
                    height={graphHeight/columns.length}
                    width={halfWidth - lineWidth}

                />)
        }
        let line =
            <ViroFlexView
                style={styles.lineStyle}
                height={graphHeight}
                width={lineWidth}
            />;
        return <ViroFlexView style={styles.xAxisContainer} height={graphHeight} width={xAxisWidth}>
            {labels}
            {line}
        </ViroFlexView>;
    };

    createYAxis = (yAxisHeight, graphWidth, w, xAxisWidth) => {
        let lineHeight = xAxisWidth / 20;
        let lineWidth = graphWidth + lineHeight;
        let children = [];
        let linePadding = <ViroFlexView
            style={styles.emptyContainer}
            height={lineHeight}
            width={w-lineWidth}
        />;
        let line = <ViroFlexView
            style={styles.lineStyle}
            height={lineHeight}
            width={lineWidth}
        />;
        children.push(linePadding);
        children.push(line);
        let textHeight = yAxisHeight-lineHeight;
        let textPadding = <ViroFlexView
            style={styles.emptyContainer}
            height={textHeight}
            width={xAxisWidth}
        />;
        let label = <ViroText
            text = "Time spent"
            height={textHeight}
            width={graphWidth}
        />;
        children.push(textPadding);
        children.push(label);

        return <ViroFlexView style={styles.yAxisContainer} height={yAxisHeight} width={w}>
            {children}
        </ViroFlexView>;
    };

    createGraph = (graphHeight, graphWidth, actions, columns) => {

        let firstDate = Date.parse(actions[0].date);
        let finalDate = Date.parse(actions[actions.length - 1].date);
        let datePadding = finalDate + 3600000; // 1 hour padding time at the end for visual niceness
        let totalTime = datePadding - firstDate;

        let graph = [];
        let widths = [];
        for (let i = 0; i < actions.length; i++) {
            let actionDate = Date.parse(actions[i].date);
            let nextDate;
            if (i != actions.length - 1) {
                nextDate = Date.parse(actions[i + 1].date);
            } else {
                nextDate = datePadding;
            }
            let timeFraction = (nextDate - actionDate) / totalTime;
            widths.push(timeFraction * (graphWidth - 2) + 2 / actions.length); // to give width to very small values
        }

        let barHeight = graphHeight / columns.length;
        for (let j = 0; j < columns.length; j++) {
            for (let i = 0; i < actions.length; i++) {
                if (j == columns.indexOf(actions[i].column)) { // if column name is correct, draw bar
                    graph.push(
                        <ViroFlexView
                            style={styles.barContainer}
                            height={barHeight}
                            width={widths[i]}/>
                    );
                } else { // else empty container
                    graph.push(
                        <ViroFlexView
                            style={styles.emptyContainer}
                            height={barHeight}
                            width={widths[i]}/>
                    );
                }
            }
        }
        return <ViroFlexView style={styles.graphContainer} height={graphHeight} width={graphWidth}>
            {graph}
        </ViroFlexView>;

    };

    render() {
        return (
            <ViroNode
                position={this.state.cardPosition}
            >
                {this.createDiagram(3, 5)}
            </ViroNode>
        );
    }
}


var styles = StyleSheet.create({
    lineStyle: {
        backgroundColor: "#ffffff",
    },

    titleStyle: {
        fontSize: 14,
        color: "#ffffff",
        textAlign: "center"
    },

    yAxisContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: "#ffffff00",
        fontSize: 8,
        color: "#ffffff",
        textAlign: "center"
    },

    xAxisContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: "#ffffff00",
        fontSize: 7,
        color: "#ffffff"
    },

    diagramContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
        backgroundColor: "#00000000"
    },

    graphContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: "#00000000"
    },
    barContainer: {
        backgroundColor: "#990022",
    },
    emptyContainer: {
        backgroundColor: "#00000000"
    }
});


module.exports = ARTrelloCardTimeline;