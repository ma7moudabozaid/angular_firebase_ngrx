import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageAppState } from '../app.state';
import { MessageState } from './message.reducer';


const getMessageFeatureState = (state: MessageAppState) => state.messages;

export const getMessages = createSelector(
  getMessageFeatureState,
  (state: MessageState) => state.messages
);
