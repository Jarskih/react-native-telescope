import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, SegmentedControlIOS} from 'react-native';
import Meteor, {MeteorListView, MeteorComplexListView} from 'react-native-meteor';
import Loading from '../../components/Loading';

import {COLORS, GRID_SETTINGS} from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.headerText,
    fontWeight: '400',
    fontStyle: 'italic'
  },
  list: {
    flexDirection: 'column',
    //flexWrap: 'wrap',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: COLORS.buttonBackground,
    color: COLORS.headerText,
    margin: GRID_SETTINGS.margin,
    width: GRID_SETTINGS.width,
    padding: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
  },
  thumb: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 2,
  },
  excerpt: {
    flex: 1,
    fontSize: 14,
    color: 'grey',
    marginBottom: 4,
  },
  joinButton: {
    padding: 10,
    borderColor: '#eee',
    borderWidth: 2,
    width: 120,
  },
  cellBorder: {
    backgroundColor: '#CCCCCC',
    height: 4,
  }
});

const RenderUpcomingListView = (props) => {
    return (

      <MeteorComplexListView 
        contentContainerStyle={styles.list} 
        elements={() => {return Meteor.collection('posts').find({}, {postedAt: 1}) }} 
        renderRow={renderRow}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}}
      />
    );
}

const RenderPastListView = (props) => {
    return (

      <MeteorComplexListView 
        contentContainerStyle={styles.list} 
        elements={() => {return Meteor.collection('posts').find({}, {postedAt: -1}) }} 
        renderRow={renderRow}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}}
      />
    );
}

const RenderListView = (props) => {
      return (
        <View style={styles.container}>
          <RenderUpcomingListView />
        </View>
    );
}

const SegmentedButtons = (props) => {
  return (
    <View style={{flex: 1}}>
      <SegmentedControlIOS
        values={['Upcoming', 'Past']}
        selectedIndex={0}
        onValueChange={(val) => {
        this.setState({
          selectedPosts: val
          })
        }}
      />
      <MeteorComplexListView 
        contentContainerStyle={styles.list} 
        elements={() => {return Meteor.collection('posts').find({}) }} 
        renderRow={renderRow}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}}
      />

    </View>
    );
}

const renderRow = (post) => {
  return (
  <View style={styles.row}>
      <Image 
        style={styles.thumb} 
        source={{uri: post.thumbnailUrl}} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {post.title}
        </Text>
        <Text numberOfLines={3} style={styles.excerpt}>
          {post.excerpt}
        </Text>
        <View style={styles.joinButton}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>JOIN NOW</Text>
        </View>
      </View>
         <View style={styles.cellBorder}></View>
    </View>
  );
}

const Posts = (props) => {
  const {postsReady, onPostPress} = props;
  return (
    !postsReady
    ? <Loading/> 
    : <SegmentedButtons />
    );
}

Posts.propTypes = {
  onPostPress: React.PropTypes.func,
};

export default Posts;
