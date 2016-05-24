import './app.loader.ts';

import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {Pages} from './pages';
import {AppState} from './app.state';
import {BaThemeConfigProvider, BaThemeConfig, BaThemeSpinner} from './theme';
import {BaThemeRun} from './theme/directives';
import {BaImageLoaderService, BaThemePreloader} from './theme/services';

import {layoutPaths} from './theme/theme.constants';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  directives: [BaThemeRun],
  providers: [BaThemeConfigProvider, BaThemeConfig, BaImageLoaderService, BaThemeSpinner],
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css'), require('./app.scss')],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
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

  constructor(private _state:AppState, private _imageLoader:BaImageLoaderService, private _spinner:BaThemeSpinner) {
    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit():void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages():void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
  }
}
