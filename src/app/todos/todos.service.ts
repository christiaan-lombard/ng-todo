import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, tap } from 'rxjs/operators';
import { TodoBoard, TodoItem, TodoList } from './todo';
import { Observable } from 'rxjs';




@Injectable()
export class TodosService {

    constructor(
        private _auth: AngularFireAuth,
        private _store: AngularFirestore
    ){}

    getUserBoards(): Observable<TodoBoard[]>{
        return this._auth.user.pipe(switchMap(user => {
            return this._store.collection<TodoBoard>('boards', q => q.where('owner', '==', user.uid)).valueChanges({idField: '_id'});
        }), tap(boards => console.log(boards)));
    }

    getBoard(board_id: string): Observable<TodoBoard>{
        return this._store.collection<TodoBoard>('boards').doc(board_id).valueChanges();
    }

    getItems(board_id: string): Observable<TodoItem[]>{
        return this._store.collection<TodoBoard>('boards').doc(board_id).collection<TodoItem>('items').valueChanges({idField: '_id'});
    }

    addItem(board_id: string, data: TodoItem){
        return this._store.collection<TodoBoard>('boards').doc(board_id).collection<TodoItem>('items').add(data);
    }

    getLists(board_id: string): Observable<TodoList[]>{
        return this._store.collection<TodoBoard>('boards').doc(board_id).collection<TodoList>('lists').valueChanges({idField: '_id'});
    }

    private userBoardsCollection(){
        
    }



}