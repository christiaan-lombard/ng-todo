import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Board } from './todo';



@Component({
    selector: 'cl-todos',
    templateUrl: 'todos.component.html',
    styleUrls: ['todos.component.scss'],
    host: {
        class: 'app-content'
    }
})
export class TodosComponent implements OnInit {

    board$: Observable<Board>;

    constructor(
        private _auth: AngularFireAuth,
        private _store: AngularFirestore
    ){}

    ngOnInit(){
        this.board$ = this._store.collection('boards').doc<Board>('test').valueChanges();
    }

}