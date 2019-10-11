import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import eventReducer from './event/eventReducer'

const store = createStore(eventReducer, applyMiddleware(thunkMiddleware))

export default store
