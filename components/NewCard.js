import React, {Component} from 'react'
import {View, Text, Button, TextInput, Alert} from 'react-native'
import {connect} from 'react-redux'
import {blue, gray, orange, purple} from "../utils/colors"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {handleAddCard} from "../actions"

class NewCard extends Component {


  state = {
    question: "",
    answer: ""
  }

  onQuestionChange = (question) => {
    this.setState({
      question: question
    })
  }

  onAnswerChange = (answer) => {
    this.setState({
      answer: answer
    })
  }

  onSubmit = () => {
    const {question, answer} = this.state
    const {dispatch, id} = this.props
    if (question === '') {
      Alert.alert('Question cannot be empty')
      return
    }

    if (answer === '') {
      Alert.alert('Answer cannot be empty')
      return
    }

    this.setState({
      question: "",
      answer: ""
    })

    dispatch(handleAddCard(id, question, answer))
    this.props.navigation.navigate('DeckPage', {id: id})
  }

  render() {
    return (
      <View style={styles.deckPageContainer}>
        <MaterialCommunityIcons name='credit-card-plus' style={styles.deckPageCenterImage} size={100}/>
        <Text style={styles.deckCardNumber}> Add a cards to this pile </Text>


        <View style={styles.deckRowItem}>
          <Text style={{flex: 0.4}}>
            Question:
          </Text>

          <TextInput style={{flex: 0.6}} value={this.state.question} onChangeText={this.onQuestionChange} placeholder="Question ..."/>

        </View>

        <View style={styles.deckRowItem}>
          <Text style={{flex: 0.4}}>
            Answer:
          </Text>

          <TextInput style={{flex: 0.6}} value={this.state.answer} onChangeText={this.onAnswerChange} placeholder="Answer ..."/>
        </View>

        <Button
          title="SUBMIT"
          color={orange}
          onPress={this.onSubmit}
        />

      </View>
    )
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {id} = navigation.state.params
  return {
    id,
    deck: state[id]
  }
}

const styles = {
  deckPageContainer: {
    marginTop: 40,
    alignItems: 'center'
  },
  deckPageCenterImage: {},
  deckRowItem: {
    flexDirection: 'row',
    flexFlow: 'center',
    padding: 15,
  },
  deckCardNumber: {
    fontSize: 12,
    color: gray
  }
}

export default connect(mapStateToProps)(NewCard)
