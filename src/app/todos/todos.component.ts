import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, tap, filter } from 'rxjs/operators';
import { Board, Todo } from './todo';
import { TodosService } from './todos.service';



@Component({
    selector: 'cl-todos',
    templateUrl: 'todos.component.html',
    styleUrls: ['todos.component.scss'],
    host: {
        class: 'app-content'
    }
})
export class TodosComponent implements OnInit {

    boards$: Observable<any>;
    board$: Observable<Board>;
    todos$: Observable<Todo[]>

    constructor(
        private _todos: TodosService
    ){}

    ngOnInit(){
        this.boards$ = this._todos.getUserBoards();
    }

}