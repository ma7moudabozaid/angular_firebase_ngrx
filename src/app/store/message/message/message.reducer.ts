import { Action, createReducer, createSelector, on } from '@ngrx/store';
// import { Action } from '@ngrx/store/src/models';

import { Message } from '../../../models/message';
import { MessageAppState } from '../app.state';
import {
  getMessage,
  getMessageSuccess,
  getMessageFailure,
  addMessage,
  addMessageSuccess,
  addMessageFailure,
} from './message.action';

export interface MessageState {
  messages: Message[];
  loading: boolean;
  error: Error;
}

export const initialMessageState = {
  messages: [],
  loading: false,
  error: undefined,
};

const reducer = createReducer(
  initialMessageState,
  on(
    getMessage,
    (state) => (
      console.log('GetMessage reducer called', state),
      {
        ...state,
        loading: true,
      }
    )
  ),

  on(
    getMessageSuccess,
    (state, { messages }) => (
      console.log('GetMessageSuccess reducer called', state, 'm', messages),
      {
        ...state,
        messages: messages,
        loading: false,
      }
    )
  ),

  on(
    getMessageFailure,
    (state, { error }) => (
      console.log('GetMessageFailure reducer called', state),
      {
        ...state,
        error: error,
        loading: false,
      }
    )
  ),

  //==========

  on(
    addMessage,
    (state) => (
      console.log('addMessage reducer called'),
      {
        ...state,
        loading: true,
      }
    )
  ),

  on(
    addMessageSuccess,
    (state, { message }) => (
      console.log('addMessageSuccess reducer called'),
      {
        ...state,
        messages: [...state.messages, message],
        loading: false,
      }
    )
  ),

  on(
    addMessageFailure,
    (state, { error }) => (
      console.log('addMessageFailure reduce'),
      {
        ...state,
        error: error,
        loading: false,
      }
    )
  )
);

export function messageReducer(state: MessageState, action: Action) {
  return reducer(state, action);
}

const getMessageFeatureState = (state: MessageAppState) => state.messages;

export const getMessages = createSelector(
  getMessageFeatureState,
  (state: MessageState) => state.messages
);
