import {AsyncStorage} from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((item) => (JSON.parse(item))).then((results) => {
    return results === null ? {
      React: {
        title: 'React',
        cards: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      JavaScript: {
        title: 'JavaScript',
        cards: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
    } : results
  })
}


export function saveDecks(state) {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(state))
}
