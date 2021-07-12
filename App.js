import React from 'react';
import Login from './app/screens/Login';
import HomeStart from './app/screens/HomeStart';
import CalendarPage from './app/screens/CalendarPage';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: HomeStart
  },
  Calendar: {
    screen: CalendarPage
  }
},
  {
    initialRouteName: 'Login'
  }
)

const App = createAppContainer(RootStack);

export default App;