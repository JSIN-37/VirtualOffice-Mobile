import React from 'react';
import Login from './app/screens/Login';
import HomeStart from './app/screens/HomeStart';
import CalendarPage from './app/screens/CalendarPage';
import DailyReport from './app/screens/DailyReport';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

global.backendURL = "http://vo.zx-software.com:3040/api/v1/";

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