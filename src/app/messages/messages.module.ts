import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

import { AddMessageComponent } from './components/add-message/add-message.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { messageReducer } from '../store/message/message/message.reducer';
import { MessageEffect } from '../store/message/message/message.effect';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MessagesComponent, AddMessageComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    StoreModule.forFeature('messages', messageReducer),
    // StoreModule.forRoot({ message: messageReducer }),
    EffectsModule.forFeature([MessageEffect]),
  ],
})
export class MessagesModule {}
