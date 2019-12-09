import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  portfolioData: any;
  titleOpacity = 1;
  constructor(private portfolioService: PortfolioService,
              private scrollDispatcher: ScrollDispatcher) {
              this.getPortfolio();
   }

  ngOnInit() {
  }
  getPortfolio() {
    this.portfolioService
    .getPortfolio()
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(res => {
      this.portfolioData = res;
    });
  }
  scrollingEvents() {
    this.scrollDispatcher.scrolled().subscribe(() =>  {
      if (window.scrollY === 0) {
        this.titleOpacity = 1;
      } else {
        this.titleOpacity = 1 / (window.scrollY / 50);
      }
    });
  }
  scrollUp() {
    const elem = document.getElementsByClassName('productExample');
    elem[0].scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
