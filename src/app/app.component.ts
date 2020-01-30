import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { SLIDE_IN_ANIMATION } from './app-animations';



@Component({
  selector: 'cl-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [SLIDE_IN_ANIMATION],
  host: {
    class: 'cl-app-root mat-typography'
  }
})
export class AppComponent implements OnInit{

  user$: Observable<firebase.User>;

  constructor(
    private _auth: AngularFireAuth,
  ){}

  ngOnInit(){

    this.user$ = this._auth.user;

    this.user$.subscribe(user => console.log(user));
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}

