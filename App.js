import React from 'react';
import Login from './app/screens/Login';
import HomeStart from './app/screens/HomeStart';
import CalendarPage from './app/screens/CalendarPage';
import DailyReport from './app/screens/DailyReport';
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
  },
  Report: {
    screen: DailyReport
  }
},
  {
    initialRouteName: 'Login'
  }
)

const App = createAppContainer(RootStack);

export default App;