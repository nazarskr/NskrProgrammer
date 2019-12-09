import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../shared/services/blog.service';
import { IBlog } from '../../shared/interfaces';
import { Blog } from '../../shared/classes/blog.class';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  blogDate: Date;
  blogTitle: string;
  blogImageUrl: string;
  blogContent: string;
  blogData: any;
  blogpost: IBlog;
  blogpostId: string;
  uploadImage: any;
  imageName: string;
  ref: any;
  newImageUrl: any;
  uploadProgress$: Observable<number>;
  constructor(private blogService: BlogService,
              private afStorage: AngularFireStorage) {
                this.getBlog();
              }

  ngOnInit() { }
  getBlog() {
    this.blogService
    .getBlog()
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(res => {
      this.blogData = res;
    });
  }
  createBlogPost() {
    if (this.blogTitle && this.blogImageUrl && this.blogContent) {
      this.blogDate = new Date();
      const newBlog = new Blog (this.blogDate, this.blogTitle, this.blogImageUrl, this.blogContent);
      this.blogService.createBlogPost(newBlog)
          .then(res => {
              this.blogTitle = '';
              this.blogImageUrl = '';
              this.blogContent = '';
      });
      alert('Create successful');
    } else {
      alert('Enter all data');
    }
  }
  deleteBlogPost(post) {
    const delPost = confirm('Are you sure?');
    if (delPost) {
      this.blogService.deleteBlogPost(post.id);
      this.afStorage.storage.refFromURL(post.imageUrl).delete();
    } else {
      alert('Cancelled');
    }
  }
  editBlogPost(post) {
    this.blogTitle = post.title;
    this.blogImageUrl = post.imageUrl;
    this.blogContent = post.content;
    this.blogpost = post;
    this.blogpostId = post.id;
  }
  updateBlogPost() {
    this.blogpost.title = this.blogTitle;
    this.blogpost.imageUrl = this.blogImageUrl;
    this.blogpost.content = this.blogContent;
    this.blogService.updateBlogPost(this.blogpostId, this.blogpost)
                    .then(() => {
                      this.blogTitle = '';
                      this.blogImageUrl = '';
                      this.blogContent = '';
    });
    alert('Update successful');
  }
  upload() {
    if (this.imageName) {
     const task = this.afStorage.upload(`blogImages/${this.imageName}`, this.uploadImage);
     this.uploadProgress$ = task.percentageChanges();
     this.afStorage.upload(`blogImages/${this.imageName}`, this.uploadImage).then(() => {
        const storage = firebase.storage();
        const pathReference = storage.ref(`blogImages/${this.imageName}`);
        pathReference.getDownloadURL().then((url) => {
          this.blogImageUrl = url;
          document.getElementById('progress').style.display = 'none';
        }).catch((error) => {
          console.log(error);
        });
      });
    }
  }
  onFilesAdded(files: File[]) {
    files.forEach(file => {
      this.imageName = file.name;
      this.uploadImage = file;
    });
  }
  onFilesRejected(file: File) {
    console.log(file);
  }
}
