import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, tap, filter, map, debounce } from 'rxjs/operators';
import { TodoBoard, TodoItem, TodoList } from './todo';
import { TodosService } from './todos.service';
import { ActivatedRoute } from '@angular/router';

interface TodosComponentState {
    id: string;
    board: TodoBoard;
    groups: {
        list: TodoList;
        items: TodoItem[];
    }[];
    ungrouped: TodoItem[];
}

@Component({
    selector: 'cl-todos',
    templateUrl: 'todos.component.html',
    styleUrls: ['todos.component.scss'],
    host: {
        class: 'app-content'
    }
})
export class TodosComponent implements OnInit {

    data$: Observable<TodosComponentState>;

    constructor(
        private _todos: TodosService,
        private _route: ActivatedRoute
    ){}

    ngOnInit(){
        
        let id$ = this._route.paramMap
            .pipe(map(params => params.get('board_id')));

        this.data$ = id$.pipe(
            switchMap(id => {
                return combineLatest(
                    of(id),
                    this._todos.getBoard(id),
                    this._todos.getItems(id),
                    this._todos.getLists(id)
                );
            }),
            map(changes => {

                let [id, board, todos, lists] = changes;

                console.log(changes);

                let groups = lists.map(list => {
                    return {
                        list,
                        items: []
                    };
                });

                let ungrouped = [];

                todos.forEach(item => {

                    let group = groups.find(group => group.list._id === item.list_id);

                    if(!group){
                        ungrouped.push(item);
                    }else{
                        group.items.push(item);
                    }

                });

                return {
                    id,
                    board,
                    groups,
                    ungrouped
                };

            }),
            tap(detail => console.log(detail))
        ); 


    }

    async addItem(board_id: string, list_id: string = null){

        let item: TodoItem = {
            title: 'new item',
            list_id
        };

        return this._todos.addItem(board_id, item);
    }


    trackById(item){
        return item._id;
    }

}