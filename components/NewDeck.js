import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, View, StyleSheet, Button, TextInput, Alert, SafeAreaView, Keyboard} from 'react-native'
import {blue} from '../utils/colors'
import {handleAddDeck} from "../actions"


class NewDeck extends Component {

  state = {
    text: ""
  }

  onSubmit = (e) => {
    const {dispatch} = this.props
    const {text} = this.state
    if (text !== "") {
      dispatch(handleAddDeck(text))
      this.setState({
        text: ""
      })

      Keyboard.dismiss()
      Alert.alert('Deck has been successfully created!')
      this.props.navigation.navigate('DashBoard')
    } else {
      Alert.alert("Deck title cannot be empty!")
    }
  }

  onChangeText = (text) => {
    this.setState({
      text: text
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.questionTitle}> What is the title of your new deck? </Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onChangeText}
            placeholder="Please enter the deck title here ..."
            value={this.state.text}
          />
        </View>

        <Button
          title="CREATE DECK"
          color={blue}
          onPress={this.onSubmit}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionTitle: {
    fontSize: 15
  },
  textInputContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  textInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3
  }
})

const mapStateToProps = (state) => {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(NewDeck)
