import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { TodoBoard } from '../todos/todo';
import { TodosService } from '../todos/todos.service';


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
    user_boards$: Observable<TodoBoard[]>;

    constructor(
        private _auth: AngularFireAuth,
        private _todos: TodosService
    ){}

    ngOnInit(){
        this.user$ = this._auth.user;
        this.user_boards$ = this._todos.getUserBoards();
    }

    loginGoogle(){
        this._auth.auth.signInWithPopup(new auth.GoogleAuthProvider);
    }

    logout(){
        this._auth.auth.signOut();
    }


}