import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, tap } from 'rxjs/operators';




@Injectable()
export class TodosService {

    constructor(
        private _auth: AngularFireAuth,
        private _store: AngularFirestore
    ){}

    getUserBoards(){
        return this._auth.user.pipe(switchMap(user => {
            return this._store.collection('boards', q => q.where('owner', '==', user.uid)).valueChanges({idField: '_id'});
        }), tap(boards => console.log(boards)));
    }

    getUserBoardsWithLists(){

    }

    private userBoardsCollection(){
        
    }



}