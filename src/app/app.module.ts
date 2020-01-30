import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './auth/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const authGuardPipe = redirectUnauthorizedToLogin;

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase, 'ng-todo'),
    AngularFireAuthModule,
    AngularFirestoreModule,

    // Material Modules
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,

    // Router
    RouterModule.forRoot([
      { path: '', component: TodosComponent,  data: { animation: 'TodosPage', authGuardPipe }, canActivate: [AngularFireAuthGuard] },
      { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' }}
    ])
  ],
  providers: [
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
