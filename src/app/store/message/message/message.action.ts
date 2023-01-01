import { createAction, props } from '@ngrx/store';
import { Message } from '../../../models/message';

//========== Get  ======================================================

export const getMessage = createAction('[Message] get Message');

export const getMessageSuccess = createAction(
  '[Message] get Message Success',
  props<{ messages: Message[] }>()
);

export const getMessageFailure = createAction(
  '[Message] get Message Failed',
  props<{ error: any }>()
);
//========== Add ======================================================
export const addMessage = createAction(
  '[Message] add Message',
  props<{ message: Message }>()
);

export const addMessageSuccess = createAction(
  '[Message] add Message Success',
  props<{ message: Message }>()
);

export const addMessageFailure = createAction(
  '[Message] add Message Failed',
  props<{ error: any }>()
);
