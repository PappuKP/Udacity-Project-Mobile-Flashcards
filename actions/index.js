import {generateUID} from '../utils/utils'
import {saveDecks} from "../utils/api"

export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_DATA = 'RECEIVE_DATA'

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data
  }
}

export function addDeck(deckTitle) {
  return {
    type: ADD_DECK,
    id: generateUID(),
    title: deckTitle
  }
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id: id
  }
}

export function addCard(deckId, question, answer) {
  return {
    type: ADD_CARD,
    deckId: deckId,
    question: question,
    answer: answer
  }
}

export function handleAddDeck(deckTitle) {
  return (dispatch, getState) => {
    dispatch(addDeck(deckTitle))
    return saveDecks(getState())
  }
}

export function handleRemoveDeck(deckId) {
  return (dispatch, getState) => {
    dispatch(removeDeck(deckId))
    return saveDecks(getState())
  }
}

export function handleAddCard(deckId, question, answer) {
  return (dispatch, getState) => {
    dispatch(addCard(deckId, question, answer))
    return saveDecks(getState())
  }
}
