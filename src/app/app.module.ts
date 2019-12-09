import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './loader-config';
// routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminContactsComponent } from './admin/admin-contacts/admin-contacts.component';
// material
import { MatMenuModule, MatFormFieldModule, MatInputModule, MatIconModule,
  MatButtonModule, MatTabsModule, MatTableModule, MatSortModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// others
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AdminPortfolioComponent } from './admin/admin-portfolio/admin-portfolio.component';
import { OrderModule } from 'ngx-order-pipe';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { LoginComponent } from './admin/login/login.component';
// import { LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactsComponent,
    PortfolioComponent,
    BlogComponent,
    AdminComponent,
    AdminBlogComponent,
    AdminContactsComponent,
    AdminPortfolioComponent,
    BlogDetailsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ScrollDispatchModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    NgxDropzoneModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    OrderModule,
    AngularFirestoreModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }], // , { provide: LocationStrategy, useClass: HashLocationStrategy }
  bootstrap: [AppComponent]
})
export class AppModule { }
