import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { AddMessageComponent } from './components/add-message/add-message.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { messageReducer } from '../store/message/message/message.reducer';
import { MessageEffect } from '../store/message/message/message.effect';

@NgModule({
  declarations: [MessagesComponent, AddMessageComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MatTableModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    StoreModule.forFeature('messages', messageReducer),
    // StoreModule.forRoot({ message: messageReducer }),
    EffectsModule.forFeature([MessageEffect]),
  ],
})
export class MessagesModule {}
