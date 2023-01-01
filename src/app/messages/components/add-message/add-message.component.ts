import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addMessage } from '../../../store/message/message/message.action';
import { MessageAppState } from '../../../store/message/app.state';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss'],
})
export class AddMessageComponent implements OnInit {

  message: Message = new Message();
  error$: Observable<Error>;
  isSubmit!: boolean;

  constructor(
    // private store: Store<{ message: Message[] }>,
    private store: Store<MessageAppState>,
    private afs: AngularFirestore,
    public messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}


  saveMessage() {
    this.message.id = this.afs.createId();
    this.message.createdAt = new Date().toISOString();

    console.log('message', this.message);
    console.log('message', { ...this.message });

    this.store.dispatch(addMessage({ message: { ...this.message }, }
      ),);

    // this.isSubmit = true;
    // this.message.id = this.afs.createId();
    // this.message.createdAt = new Date().toISOString();
    // // this.message.createdAt =  firebase.firestore.FieldValue.serverTimestamp();

    // this.messageService.createMessage(this.message).then(() => {
    //   this.isSubmit = false;

    //   this._snackBar.open('Created new item successfully!', 'Undo', {
    //     duration: 3000,
    //   });
    //   console.log('Created new item successfully!');
    // });
  }
}
