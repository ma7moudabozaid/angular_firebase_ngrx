import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  shareReplay,
  switchMap,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { MessageService } from '../../../services/message.service';
import {
  getMessage,
  getMessageSuccess,
  getMessageFailure,
  addMessage,
  addMessageSuccess,
  addMessageFailure,
} from './message.action';
import { Router } from '@angular/router';

@Injectable()
export class MessageEffect {
  store: any;
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService
  ) {}

  loadEmployee$  = createEffect(() =>
    this.actions$.pipe(
      ofType(getMessage),
      switchMap(() =>
        this.messageService.getMessages().pipe(
          map((messages) => getMessageSuccess({ messages })),
          catchError((error) => of(getMessageFailure({ error })))
        )
      )
    )
  );


  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMessage),
      mergeMap(({ message }) =>
        of(this.messageService.createMessage(message)).pipe(
          map(() => addMessageSuccess({ message },)),
          // tap(() => this.router.navigate(['/'])),
          tap(() => console.log('message-effect', message)),
          catchError((error) => of(addMessageFailure({ error })))
        )
      )
    )
  );


  // loadCategory = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getMessage),
  //     switchMap(() =>
  //       this.messageService.getMessages()
  //       .snapshotChanges()
  //       .pipe(
  //         map((changes) =>
  //         changes.map((c) => ({
  //           id: c.payload.doc.id,
  //           ...c.payload.doc.data(),
  //         }))
  //       ),
  //         map((response) => getMessageSuccess({ messages: response })),
  //       )
  //     )
  //   )
  // );

  // createCategory = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addCategory),
  //     switchMap((action) => {
  //       return this.categoryService
  //         .addCategory(action.category)
  //         .pipe(map((data) => addCategorySuccess({ category: data })));
  //     })
  //   )
  // );
}
