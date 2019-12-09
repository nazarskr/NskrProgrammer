import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Portfolio } from '../classes/portfolio.class';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private dbPath = '/portfolio';
  portfolioRef: AngularFirestoreCollection<Portfolio> = null;
  constructor(private firestore: AngularFirestore) {
    this.portfolioRef = firestore.collection(this.dbPath, ref => ref.orderBy('date', 'desc'));
   }
  getPortfolio() {
    return this.portfolioRef;
  }
  createProduct(product) {
    return this.portfolioRef.add({...product});
  }
  updateProduct(key, value) {
    return this.portfolioRef.doc(key)
    .update({...value});
  }
  deleteProduct(key) {
    return this.portfolioRef.doc(key).delete();
  }
}
