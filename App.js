import React from 'react';
import Login from './app/Screens/Login';
import HomeStart from './app/Screens/HomeStart';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: HomeStart
  }
  },
  {
    initialRouteName: 'Login'
  }
)

const App = createAppContainer(RootStack);

export default App;