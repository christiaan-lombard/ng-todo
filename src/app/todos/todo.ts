



export interface TodoBoard {
    _id?: string;
    title?: string;
    items?: TodoItem[];
}

export interface TodoList {
    _id?: string;
    title?: string;
}

export interface TodoItem {
    _id?: string;
    title?: string;
    list_id?: string;
}