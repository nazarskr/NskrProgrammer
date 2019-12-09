import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Contact } from '../classes/contacts.class';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private dbPath = '/contacts';
  contactsRef: AngularFirestoreCollection<Contact> = null;
  constructor(private firestore: AngularFirestore) {
    this.contactsRef = firestore.collection(this.dbPath, ref => ref.orderBy('date', 'desc'));
  }
  getContacts() {
    return this.contactsRef;
  }
  createContact(contact) {
    return this.contactsRef.add({...contact});
  }
  deleteContact(key) {
    return this.contactsRef.doc(key).delete();
  }
}
