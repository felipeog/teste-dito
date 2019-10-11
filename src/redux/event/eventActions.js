import axios from 'axios'
import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE
} from './eventTypes'

const fetchEventsRequest = () => ({
  type: FETCH_EVENTS_REQUEST
})

const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: events
})

const fetchEventsFailure = error => ({
  type: FETCH_EVENTS_FAILURE,
  payload: error
})

const fetchEvents = () => {
  return function(dispatch) {
    dispatch(fetchEventsRequest())

    axios
      .get('https://storage.googleapis.com/dito-questions/events.json')
      .then(response => {
        const events = response.data

        dispatch(fetchEventsSuccess(events))
      })
      .catch(error => {
        dispatch(fetchEventsFailure(error.message))
      })
  }
}

export {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
  fetchEvents
}
