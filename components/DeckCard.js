import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, StyleSheet, Platform, Keyboard} from 'react-native'
import {gray, white} from "../utils/colors"

class DeckCard extends Component {

  render() {
    const {deck} = this.props
    return (
      <TouchableOpacity style={styles.deckCard} onPress={this.props.onPress}>
        <Text style={styles.deckTitle}> {deck.title} </Text>
        <Text style={styles.deckCardNumber}> {deck.cards.length} cards </Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  deckTitle: {
    fontSize: 24
  },
  deckCardNumber: {
    fontSize: 12,
    color: gray
  },
  deckCard: {
    flex: 1,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  }
})


export default connect()(DeckCard)
