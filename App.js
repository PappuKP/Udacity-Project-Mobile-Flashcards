import React, {Component} from 'react'
import {StyleSheet, Text, View, Platform, SectionList, StatusBar} from 'react-native'
import {applyMiddleware, createStore} from 'redux'
import reducers from './reducers'
import {Provider} from 'react-redux'
import {white, purple} from './utils/colors'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import {Ionicons, FontAwesome} from '@expo/vector-icons'
import thunk from "redux-thunk"
import {Constants, statusBarHeight} from 'expo-constants'


import DashBoard from './components/DashBoard'
import NewDeck from "./components/NewDeck"
import DeckPage from "./components/DeckPage"
import NewCard from "./components/NewCard"
import QuizPage from "./components/QuizPage"
import {receiveData} from "./actions"
import {getDecks} from "./utils/api"
import {setLocalNotification} from "./utils/notifications"


const Tabs = createBottomTabNavigator({
    DashBoard: {
      screen: DashBoard,
      navigationOptions: {
        tabBarLabel: 'DashBoard',
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New',
        tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
      }
    },
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const naviOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: purple,
  }
}

const Stacks = createStackNavigator({
  DashBoard: {
    screen: Tabs,
  },
  DeckPage: {
    screen: DeckPage,
    navigationOptions: naviOptions
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: naviOptions
  },
  QuizPage: {
    screen: QuizPage,
    navigationOptions: naviOptions
  }
})

function UdaciStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: statusBarHeight}}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const TabContainer = createAppContainer(Tabs)
const StackContainer = createAppContainer(Stacks)
const store = createStore(reducers, applyMiddleware(thunk))


export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
    getDecks().then((data) => {
      store.dispatch(receiveData(data))
    })
  }

  render() {
    return (
      <Provider store={store}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
        <StackContainer/>
      </Provider>
    )
  }
}




