import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {PageOne} from 'plugin/PluS_pageone';
import {PageTwo} from 'plugin/PluS_pagetwo';

@Component({
  selector: 'b',
  template: `12345`
})

export class B {}

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
                <a [routerLink]="['PageOne']">GOTO PageOne </a>
                <a [routerLink]="['PageTwo']">GOTO B </a>
                <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path:'/one', name: 'PageOne', component: PageOne, useAsDefault: true},
  {path:'/two', name: 'PageTwo', component: PageTwo}
])

export class AppComponent {}


