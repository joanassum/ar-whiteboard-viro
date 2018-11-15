'use strict';

import React, {Component} from 'react';
import {
  ViroNode,
  ViroText,
  ViroFlexView
} from 'react-viro';
import MenuCardContainer from "./containers/MenuCardContainer";
import {getFilteredListMap} from './backend/backendController';
import {StyleSheet} from "react-native";

class ARTrelloList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listLoaded: false,
      lists: [{
        listName: "Loading....", listId: "Loading...."
      }],
      listClick: false,
      listObj: {
        listName: "Loading....", listId: "Loading...."
      },
    };

    this.clickList = this.clickList.bind(this);
  }

  componentDidMount() {
    getFilteredListMap("boardId" ,"none").then((response) => {
      this.setState({lists: response, listLoaded: true});
    });
  }

  clickList(position, source, listObj) {
    this.setState({listClick: true, listObj: listObj});
    if(this.state.listLoaded){
      this.props.setMenuViewName(listObj.listName);
    }
  }

  render() {
    return (
      <ViroNode
        position={[0, 0, 0]}
      >
        {
          (this.state.listLoaded && !this.state.listClick)? (
            this.state.lists.map((n, i) => {
              return (
                <ViroFlexView
                  position={[0, (-0.5 * (i)), 0]}
                  style={styles.titleContainer}
                  height={0.4}
                  width={1.75}
                  key={n.listId}
                  onClick={(pos, src, listObj = n) => this.clickList(pos, src, listObj)}>
                  <ViroText
                    style={styles.prodDescriptionText}
                    text={n.listName}
                    key={n.listId}
                  />
                </ViroFlexView>);
            })
          ) : null
        }
        {
          this.state.listClick ? <MenuCardContainer listId={this.state.listObj.listId} /> : null
        }
      </ViroNode>
    );
  }
}

module.exports = ARTrelloList;

var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#FFFFFF",
  }
});