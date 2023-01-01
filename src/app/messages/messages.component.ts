import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddMessageComponent } from './components/add-message/add-message.component';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { select, Store } from '@ngrx/store';
import { MessageAppState } from '../store/message/app.state';
import { getMessage } from '../store/message/message/message.action';
import { getMessages } from '../store/message/message/message.selector';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  // messages: Message[] = [];

  messages$: Observable<Message[]>;
  loading$!: Observable<Boolean>;
  error$!: Observable<Error>;

  displayedColumns: string[] = ['id', 'name', 'message', 'createdAt'];

  // messages!: Observable<Message[]>;
  constructor(
    private store: Store<MessageAppState>,
    public messageService: MessageService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.store.dispatch(getMessage());
    this.messages$ = this.store.pipe(select(getMessages));
    this.loading$ = this.store.select((store) => store.messages.loading);
    console.log(this.messages$);
    // this.store.dispatch(getMessage());
    // this.messages = this.store.pipe(select('messages'));

    // this.retrieveMessages();
  }

  // retrieveMessages() {
  //   this.messageService
  //     .getMessages()
  //     .snapshotChanges()
  //     .pipe(
  //       map((changes) =>
  //         changes.map((c) => ({
  //           id: c.payload.doc.id,
  //           ...c.payload.doc.data(),
  //         }))
  //       )
  //     )
  //     .subscribe((data) => {
  //       this.messages = data;
  //     });
  // }

  openDialog() {
    const dialogRef = this.dialog.open(AddMessageComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
