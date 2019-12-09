import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { map } from 'rxjs/operators';
import * as vars from '../../../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('opacityElement', [
      state('static', style({
        opacity: '0'
      })),
      state('scroll', style({
        opacity: '1'
      })),
      transition('static => scroll',
        animate('2s')),
      transition('scroll => static',
        animate('.5s')),
    ]),
    trigger('leftToRight', [
      state('static', style({
        transform: 'translateX(-500%)',
        width: 0,
        opacity: 0
      })),
      state('scroll', style({
        transform: 'translateX(0)',
      })),
      transition('static <=> scroll',
        animate('.5s')),
    ]),
    trigger('rightToLeft', [
      state('static', style({
        transform: 'translateX(500%)',
        width: 0,
        opacity: 0
      })),
      state('scroll', style({
        transform: 'translateX(0)',
      })),
      transition('static <=> scroll',
        animate('.5s')),
    ]),
    trigger('scaleXElement', [
      state('static', style({
        transform: 'scaleX(0) scaleY(.4)',
        opacity: .2
      })),
      state('scroll', style({
        transform: 'scaleX(1)',
        opacity: 1
      })),
      transition('static <=> scroll',
        animate('.5s')),
    ]),
    trigger('scaleYElement', [
      state('static', style({
        transform: 'scaleY(0) scaleX(.4)',
        opacity: .2
      })),
      state('scroll', style({
        transform: 'scaleY(1)',
        opacity: 1
      })),
      transition('static <=> scroll',
        animate('.5s')),
    ]),
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  meProgrammerVar = false;
  homeSayHelloVar = false;
  homeRecentWorksVar = false;
  homeMySkillsVar = false;
  portfolioData: any;
  constructor(private scrollDispatcher: ScrollDispatcher,
              private portfolioService: PortfolioService) {
                this.getPortfolio();
              }

  ngOnInit() {
    setTimeout(() => {
      if (this.meProgrammerVar === false) {
        this.meProgrammerVar = true;
      }
    }, 2000);
  }
  ngOnDestroy() {
    if (this.meProgrammerVar === true) {
      this.meProgrammerVar = false;
    }
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
    .subscribe(res => (this.portfolioData = res));
  }
  scrollingEvents() {
    this.scrollDispatcher.scrolled().subscribe(x =>  {
      if (vars.catchElementScroll('homeSayHello') === true) {
        this.homeSayHelloVar = true;
      } else {
        this.homeSayHelloVar = false;
      }
      if (vars.catchElementScroll('homeRecentWorks') === true) {
        this.homeRecentWorksVar = true;
      } else {
        this.homeRecentWorksVar = false;
      }
      if (vars.catchElementScroll('homeMySkills') === true) {
        this.homeMySkillsVar = true;
      } else {
        this.homeMySkillsVar = false;
      }
    });
  }
}
