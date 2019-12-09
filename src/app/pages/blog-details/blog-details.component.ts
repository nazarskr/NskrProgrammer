import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogService } from '../../shared/services/blog.service';
import * as vars from '../../../globals';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blogpost: any;
  blogArray: Array<any>;
  bgrColor: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private blogService: BlogService
  ) {
    this.getBlog();
  }
  ngOnInit() {
    this.colorChoose();
  }
  ngOnDestroy() {
    this.colorChoose();
  }
  getBlog() {
    this.blogService.getBlog()
    .valueChanges()
    .subscribe(
      data => {
        this.blogArray = data;
        this.route.paramMap.subscribe(params => {
          this.blogpost = this.blogArray[+params.get('blogpostId')];
        });
      });
  }
  colorChoose() {
    const colors = ['gold', 'coral', 'grey', 'orange', 'olive', 'chocolate', 'peru'];
    const num = vars.getRandom(colors.length);
    this.bgrColor = colors[num];
  }
  goBack(): void {
    this.location.back();
  }

}
