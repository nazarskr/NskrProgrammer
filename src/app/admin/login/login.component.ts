import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ILogin } from '../../shared/interfaces';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';

let enter = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginArray: any;
  entrance: ILogin;
  adminLogin: string;
  adminPass: string;

  constructor(private loginService: LoginService,
              public router: Router) {
    this.getEntrance();
  }

  ngOnInit() {
  }

  private getEntrance(): void {
    this.loginService.getEntrance()
    .valueChanges()
    .subscribe(
      data => {
        this.loginArray = data;
        this.entrance = this.loginArray[0];
      }
    );
  }
  login() {
    if (this.adminLogin === this.entrance.login && this.adminPass === this.entrance.password) {
      enter = true;
      this.adminLogin = '';
      this.adminPass = '';
      this.router.navigate(['admin']);
    } else {
      enter = false;
      this.adminLogin = '';
      this.adminPass = '';
      alert('ти не адмін, ти - мудак!');
      this.router.navigate(['далеко']);
    }
  }
}
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!enter) {
      this.router.navigate(['login']);
    }
    return enter;
  }
}
