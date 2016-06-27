import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Posts from './Posts';

const onHomePress = (navigator) => {
  return navigator.push(Routes.getPostsRoute());
};

class PostsContainer extends Component {

  render() {
    const { postsReady } = this.props;

    return (
      <Posts
        postsReady = { postsReady }
        onPostPress={() => onPostPress(props.navigator)}
      />
    );
  }
}

export default createContainer(() => {
  const handle = Meteor.subscribe('posts.list', Meteor.user());

  return {
    postsReady: handle.ready(),
  };
},PostsContainer);
