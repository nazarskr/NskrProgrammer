import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminComponent } from './admin/admin.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminGuard } from '../app/admin/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'blog/:blogpostId', component: BlogDetailsComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AdminGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
