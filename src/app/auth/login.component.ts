import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';


@Component({
    selector: 'cl-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    host: {
        class: 'app-content'
    }
})
export class LoginComponent implements OnInit {

    user$: Observable<firebase.User>;

    constructor(private _auth: AngularFireAuth){}

    ngOnInit(){
        this.user$ = this._auth.user;
    }

    loginGoogle(){
        this._auth.auth.signInWithPopup(new auth.GoogleAuthProvider);
    }

    logout(){
        this._auth.auth.signOut();
    }


}