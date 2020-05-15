import {ADD_CARD, ADD_DECK, REMOVE_DECK, RECEIVE_DATA} from '../actions/index'

export default function decks(decks = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...decks,
        [action.id]: {
          title: action.title,
          cards: []
        }
      }
    case REMOVE_DECK:
      const nextState = decks
      delete nextState[action.id]
      return nextState

    case ADD_CARD:
      const {deckId, question, answer} = action
      return {
        ...decks,
        [deckId] : {
          ... decks[deckId],
          cards: decks[deckId].cards.concat({question: question, answer: answer})
        }
      }
    case RECEIVE_DATA:
      console.log(action.data)
      return action.data
    default:
      return decks
  }
}
