import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {blue, gray, purple, orange, red} from "../utils/colors"
import {handleRemoveDeck} from '../actions'

class DeckPage extends Component {
  static navigationOptions = ({navigation}) => (
    {title: `Deck for ${navigation.state.params.title}`}
  )

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {id} = this.props
    return Object.keys(nextProps.decks).includes(id)
  }

  onDeleteDeck = () => {
    const {dispatch, navigation, id, refresh} = this.props
    dispatch(handleRemoveDeck(id)).then(() => {
      refresh()
      navigation.navigate('DashBoard')
    })
  }


  render() {
    const {id, deck, navigation} = this.props
    return (
      <View style={styles.deckPageContainer}>
        <MaterialCommunityIcons name='cards-variant' style={styles.deckPageCenterImage} size={100}/>
        <Text style={styles.deckCardNumber}> {deck.cards.length} cards in the pile </Text>
        <Button
          title="ADD A CARD"
          color={blue}
          onPress={() => this.props.navigation.navigate('NewCard', {id: id})}
        />
        <Button
          title="START QUIZ"
          color={orange}
          onPress={() => this.props.navigation.navigate('QuizPage', {id: id, title: navigation.state.params.title})}
        />
        <Button
          title="DELETE DECK"
          color={red}
          onPress={this.onDeleteDeck}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {id, refresh} = navigation.state.params
  return {
    id,
    deck: state[id],
    decks: state,
    refresh: refresh
  }
}

const styles = {
  deckPageContainer : {
    marginTop: 40,
    alignItems: 'center'
  },
  deckPageCenterImage : {

  },
  deckCardNumber: {
    fontSize: 12,
    color: gray
  }
}
export default connect(mapStateToProps)(DeckPage)
