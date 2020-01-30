import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';


export const SLIDE_IN_ANIMATION =
trigger('routeAnimations', [
    transition('TodosPage => LoginPage', [
        query(':enter', [
            style({
                zIndex: 0,
            }),
        ]),
        query(':leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
            }),
            animate('500ms ease-out', style({ top: '100%' }))
        ]),
    ]),
    transition('LoginPage => TodosPage', [
        query(':enter', [
            style({
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
            }),
            animate('500ms ease-out', style({ top: 0 }))
        ]),
        query(':leave', [
            style({
                zIndex: 0,
            }),
        ]),
    ]),
]);
