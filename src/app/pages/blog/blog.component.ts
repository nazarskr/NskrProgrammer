import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../shared/services/blog.service';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogData: any;
  colorState = true;
  logoOpacity = 1;
  constructor(private blogService: BlogService,
              private scrollDispatcher: ScrollDispatcher) {
                this.getBlog();
               }
  ngOnInit() {
  }
  getBlog() {
    this.blogService
    .getBlog().snapshotChanges()
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
  scrollingEvents() {
    this.scrollDispatcher.scrolled().subscribe(() =>  {
      if (window.scrollY === 0) {
        this.logoOpacity = 1;
      } else {
        this.logoOpacity = 1 / (window.scrollY / 10);
      }
    });
  }
}

