import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {Pages} from './pages';
import {AppState} from './app.state';
import {BaThemeConfigProvider, BaThemeConfig} from './theme';
import {BaThemeRun} from './theme/directives';
import './app.loader.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  directives: [BaThemeRun],
  providers: [BaThemeConfigProvider, BaThemeConfig],
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css'), require('./app.scss')],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <router-outlet></router-outlet>
    </main>
  `
})
@RouteConfig([
  {
    path: '/pages/...',
    name: 'Pages',
    component: Pages,
    useAsDefault: true
  },
])
export class App {

  isMenuCollapsed:boolean = false;

  constructor(private _state:AppState, private _baThemeConfig:BaThemeConfig) {

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }
}
