import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Blog } from '../classes/blog.class';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private dbPath = '/blog';
  blogRef: AngularFirestoreCollection<Blog> = null;
  constructor(private firestore: AngularFirestore) {
    this.blogRef = firestore.collection(this.dbPath, ref => ref.orderBy('date', 'desc'));
  }
  getBlog() {
    return this.blogRef;
  }
  createBlogPost(blogpost) {
    return this.blogRef.add({...blogpost});
  }
  updateBlogPost(key, value) {
    return this.blogRef.doc(key)
    .update(value);
  }
  deleteBlogPost(key) {
    return this.blogRef.doc(key).delete();
  }
}

