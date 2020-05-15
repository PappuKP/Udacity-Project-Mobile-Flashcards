# Mobile Flashcard Project

## About this project

This is the completed final assessment project for Udacity's React & Redux course. For the UdaciCards project, you will build a mobile application (Android or iOS - or both) that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.


## Install & Run
This project has been tested on iOS platform.

```bash
$ yarn install # install the dependencies
$ expo start --ios # run on ios simulator
```

## Backend Asynchronous Storage

Storage key is
```
export const DECK_STORAGE_KEY = 'MobileFlashcards:deck'
```

```
{
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
    }
}
```
