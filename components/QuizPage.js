import React, {Component} from 'react'
import {View, Text, StyleSheet, Button} from "react-native"
import {connect} from 'react-redux'
import {orange, red, green} from "../utils/colors"
import {clearLocalNotification, setLocalNotification} from "../utils/notifications"


class QuizPage extends Component {

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  static navigationOptions = ({navigation}) => (
    {title: `Quiz for ${navigation.state.params.title}`}
  )

  state = {
    currentQuestionIdx: 0,
    answerShown: false,
    correctNum: 0,
    incorrectNum: 0
  }

  onShownAnswer = () => {
    this.setState({
      answerShown: true
    })
  }

  onCorrectGuess = () => {
    this.setState((state) => ({
        currentQuestionIdx: state.currentQuestionIdx + 1,
        correctNum: state.correctNum + 1,
        answerShown: false
      })
    )
  }

  onIncorrectGuess = () => {
    this.setState((state) => ({
        currentQuestionIdx: state.currentQuestionIdx + 1,
        incorrectNum: state.incorrectNum + 1,
        answerShown: false
      })
    )
  }

  onRestartQuiz = () => {
    this.setState({
      currentQuestionIdx: 0,
      answerShown: false,
      correctNum: 0,
      incorrectNum: 0
    })
  }

  render() {
    const {currentQuestionIdx, answerShown, correctNum, incorrectNum} = this.state
    const {deck} = this.props
    const questionNum = deck.cards.length

    return (
      <View style={styles.container}>
        {
          questionNum === 0 ?
            <Text> There is no cards on this deck. Please add cards before taking the quiz! </Text> :
            currentQuestionIdx >= questionNum ? (
                <View>
                  <Text> You have finished the quiz! You got {correctNum} correct over {questionNum} questions! </Text>
                  <Button
                    title="RESTART QUIZ"
                    color={orange}
                    onPress={this.onRestartQuiz}
                  />
                  <Button
                    title="BECK TO DECK"
                    color={green}
                    onPress={() => {
                      this.props.navigation.goBack()
                    }}
                  />
                </View>
              ) :
              (
                <View>
                  <Text> {`${(currentQuestionIdx + 1).toString()} / ${questionNum.toString()}`} </Text>
                  <Text> Question: {deck.cards[currentQuestionIdx].question} </Text>
                  <Text> Answer: {answerShown ? deck.cards[currentQuestionIdx].answer : '???'} </Text>

                  <Button
                    title="SHOW THE ANSWER"
                    color={orange}
                    onPress={this.onShownAnswer}
                  />

                  <Button
                    title="CORRECT"
                    color={green}
                    onPress={this.onCorrectGuess}
                  />

                  <Button
                    title="NOT CORRECT"
                    color={red}
                    onPress={this.onIncorrectGuess}
                  />

                </View>
              )
        }
      </View>
    )
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {id} = navigation.state.params
  return {
    deck: state[id],
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flexDirection: 'row'
  }
})

export default connect(mapStateToProps)(QuizPage)
