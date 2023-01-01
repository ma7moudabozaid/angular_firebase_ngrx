import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private dbMessage = '/messages';

  messageCollection: AngularFirestoreCollection<Message>;

  constructor(private afs: AngularFirestore) {
    this.messageCollection = afs.collection(this.dbMessage, (ref) =>
      ref.orderBy('createdAt', 'desc')
    );
  }

  getMessages(): Observable<Message[]> {
    const messages = this.afs
      .collection<Message>('messages', (ref) =>
        ref.orderBy('createdAt', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      );
    return messages;
  }

  createMessage(message: Message) {
    // const employeeData = JSON.parse(JSON.stringify(message));
    // console.log(employeeData);
    // console.log(message);
    console.log({ ...message });
    return this.afs.collection('messages').add({ ...message });
  }
  // getMessage(): AngularFirestoreCollection<Message> {
  //   return this.messageCollection;
  // }
  // createMessage1(message: Message): any {
  //   return this.messageCollection.add({ ...message });
  // }
}
