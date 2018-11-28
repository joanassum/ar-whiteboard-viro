import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import {getKaizenImprovements, postKaizenImprovements} from "./backend/backendController";
import CommentInput from "./CommentInput";

class KaizenImprovement extends Component {

  constructor(props){
    super(props);

    this.state = {

      sectionLoaded: false,
      sectionLoading: false,
      sections: [
        {title: 'BoardName1', data: ['Improv1']},
        {title: 'BoardName2', data: ['Improv1', 'Improv2', 'Improv3', 'Improv4', 'Improv5']},
      ],

    };

    this.onPostSubmit = this.onPostSubmit.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchImprovements = this.fetchImprovements.bind(this);
  }

  fetchImprovements(){
    this.setState({sectionLoading: true});

    // getKaizenImprovements(this.prop.boardId).then((response) => {
    //   this.setState({sections: response, sectionLoaded: true, sectionLoading: false});
    // });
  }

  componentWillMount(){
    this.fetchImprovements();
  }

  onRefresh(){
    this.fetchImprovements();
  }

  onPostSubmit(improvementData) {

    this._scrollView.scrollTo({y: 0});

    // postKaizenImprovements(this.props.boardId, improvementData).then((response) => {
    //   console.log(response);
    //   let newImprov = this.state.sections;
    //
    //   //
    //   // newImprov.unshift(
    //   //   {
    //   //     cardId: this.props.cardId,
    //   //     userId: this.props.currentMemberID,
    //   //     userName: this.props.currentMemberName,
    //   //     date: date.toDateString(),
    //   //     comment: commentData
    //   //   });
    //   this.setState({sections: newImprov});
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.sections}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
        <CommentInput onSubmit={(text) => this.onPostSubmit(text)} />
      </View>
    );
  }
}

export default KaizenImprovement;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

