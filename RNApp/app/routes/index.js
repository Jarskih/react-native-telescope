import React from 'react';
import Home from './Home';
import Posts from './Posts';
import Profile from './Profile';

const Routes = {
  getHomeRoute() {
    return {
      renderScene(navigator) {
        return <Home navigator={navigator} />;
      },

      getTitle() {
        return 'Home';
      },
    };
  },
  getPostsRoute() {
    return {
      renderScene(navigator) {
        return <Posts navigator={navigator} />;
      },

      getTitle() {
        return 'Posts';
      },
    };
  },
  getProfileRoute() {
    return {
      renderScene(navigator) {
        return <Profile navigator={navigator} />;
      },

      showNavigationBar: false,
    };
  },
};

export default Routes;
