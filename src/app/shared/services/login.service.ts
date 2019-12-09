import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Login } from '../classes/login.class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private dbPath = '/login';
  loginRef: AngularFirestoreCollection<Login> = null;
  constructor(private firestore: AngularFirestore) {
    this.loginRef = firestore.collection(this.dbPath);
  }
  getEntrance() {
    return this.loginRef;
  }
}
