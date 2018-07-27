import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { appRouting } from './app.routing';

import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // prevent 404 error and add Hash to default url (/#/{{url}})

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // add for toaster message with animation

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
// import { BookService } from './services/book.service';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';

// import shared module
import { AlertModule } from './shared/alert/alert.module';
import { LoaderModule } from './shared/loader/loader.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    appRouting,
    AlertModule.forRoot(),
    LoaderModule.forRoot()
  ],
  declarations: [AppComponent, ErrorComponent],
  providers: [
    ValidateService,
    AuthService,
    // BookService,
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// // ReactiveFormsModule module required for input validator in mat-form
// import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

// import { HttpModule } from '@angular/http';
// import { Routes, RouterModule } from '@angular/router';

// // add for toaster message with animation
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToasterModule } from 'angular2-toaster';

// // add services
// import { BookService } from './services/book.service';
// import { ValidateService } from './services/validate.service';
// import { AuthService } from './services/auth.service';
// import { ChatService } from './services/chat.service';

// // prevent 404 error
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// import { AppComponent } from './app.component';
// import { BookComponent } from './book/book.component';
// import { BookDetailComponent } from './book-detail/book-detail.component';
// import { BookCreateComponent } from './book-create/book-create.component';
// import { BookEditComponent } from './book-edit/book-edit.component';
// // import { NavbarComponent } from './components/navbar/navbar.component'; // import in pages.module

// // separated login to another module
// // import { LoginComponent } from './components/login/login.component';

// // import { RegisterComponent } from './components/register/register.component'; // load in register module
// import { HomeComponent } from './components/home/home.component';
// // import { DashboardComponent } from './components/dashboard/dashboard.component'; // import in dashboard module
// import { ProfileComponent } from './components/profile/profile.component';

// import { AuthGuard } from './guards/auth.guard';
// // import { SidemenuComponent } from './components/sidemenu/sidemenu.component'; // load in pages module
// import { MatFormComponent } from './components/mat-form/mat-form.component';

// /* import angular material module */
// import {
//   MatAutocompleteModule,
//   MatButtonModule,
//   MatButtonToggleModule,
//   MatCardModule,
//   MatCheckboxModule,
//   MatChipsModule,
//   MatDatepickerModule,
//   MatDialogModule,
//   MatExpansionModule,
//   MatGridListModule,
//   MatIconModule,
//   MatInputModule,
//   MatListModule,
//   MatMenuModule,
//   MatNativeDateModule,
//   MatPaginatorModule,
//   MatProgressBarModule,
//   MatProgressSpinnerModule,
//   MatRadioModule,
//   MatRippleModule,
//   MatSelectModule,
//   MatSidenavModule,
//   MatSliderModule,
//   MatSlideToggleModule,
//   MatSnackBarModule,
//   MatSortModule,
//   MatTableModule,
//   MatTabsModule,
//   MatToolbarModule,
//   MatTooltipModule,
//   MatStepperModule,
// } from '@angular/material';
// import {CdkTableModule} from '@angular/cdk/table';
// import { ChatComponent } from './components/chat/chat.component';
// import { ChatAdminComponent } from './chat-admin/chat-admin.component';

// // separated routes to module
// import { routing } from './app.routing';
// // const appRoutes: Routes = [
// //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
// //   { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
// //   { path: 'register', component: RegisterComponent },
// //   // { path: 'login', component: LoginComponent }, // separated login to another module
// //   { path: 'login', loadChildren: './component/login/login.module#LoginModule' }, // reoutes to component module
// //   { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
// //   { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
// //   { path: 'books', component: BookComponent, canActivate:[AuthGuard] },
// //   { path: 'book-details/:id', component: BookDetailComponent, canActivate:[AuthGuard] },
// //   { path: 'book-create', component: BookCreateComponent, canActivate:[AuthGuard] },
// //   { path: 'book-edit/:id', component: BookEditComponent, canActivate:[AuthGuard] },
// //   { path: 'mat-form', component: MatFormComponent },
// //   { path: 'chat', component: ChatComponent },
// //   { path: 'chat-admin', component: ChatAdminComponent, canActivate:[AuthGuard] },
// // ];

// @NgModule({
//   exports: [
//     CdkTableModule,
//     MatAutocompleteModule,
//     MatButtonModule,
//     MatButtonToggleModule,
//     MatCardModule,
//     MatCheckboxModule,
//     MatChipsModule,
//     MatStepperModule,
//     MatDatepickerModule,
//     MatDialogModule,
//     MatExpansionModule,
//     MatGridListModule,
//     MatIconModule,
//     MatInputModule,
//     MatListModule,
//     MatMenuModule,
//     MatNativeDateModule,
//     MatPaginatorModule,
//     MatProgressBarModule,
//     MatProgressSpinnerModule,
//     MatRadioModule,
//     MatRippleModule,
//     MatSelectModule,
//     MatSidenavModule,
//     MatSliderModule,
//     MatSlideToggleModule,
//     MatSnackBarModule,
//     MatSortModule,
//     MatTableModule,
//     MatTabsModule,
//     MatToolbarModule,
//     MatTooltipModule,
//   ]
// })
// export class DemoMaterialModule {}

// @NgModule({
//   declarations: [
//     AppComponent,
//     BookComponent,
//     BookDetailComponent,
//     BookCreateComponent,
//     BookEditComponent,
//     // NavbarComponent,
//     // LoginComponent,
//     // RegisterComponent,
//     HomeComponent,
//     // DashboardComponent,
//     ProfileComponent,
//     // SidemenuComponent,
//     MatFormComponent,
//     ChatComponent,
//     ChatAdminComponent
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     HttpModule,
//     ToasterModule,
//     // RouterModule.forRoot(appRoutes),
//     routing,
//     DemoMaterialModule,
//     MatNativeDateModule,
//     ReactiveFormsModule
//   ],
//   providers: [
//     BookService, ChatService,
//     {provide: LocationStrategy, useClass: HashLocationStrategy},
//     ValidateService,
//     AuthService, AuthGuard
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
