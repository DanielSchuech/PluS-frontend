import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'b',
  template: `12345`
})

export class B {}

@Component({
  selector: 'a',
  template: 'abc'
})

export class A {}

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
                <a [routerLink]="['A']">GOTO A </a>
                <a [routerLink]="['B']">GOTO B </a>
                <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path:'/a', name: 'A', component: A}
  
])
@RouteConfig([
  {path:'/b', name: 'B', component: B}
])

export class AppComponent { }


