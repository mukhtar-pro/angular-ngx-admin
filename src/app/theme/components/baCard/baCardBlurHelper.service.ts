import {Injectable} from '@angular/core'
import {BgMetrics} from './bgMetrics';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BaCardBlurHelper {
  private image:HTMLImageElement;
  private imageLoadSubject:Subject<void>;

  constructor() {
    this._genBgImage();
    this._genImageLoadSubject();
  }

  private _genBgImage():void {
    this.image = new Image();
    let computedStyle = getComputedStyle(document.body, ':before');
    this.image.src = computedStyle.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
  }

  private _genImageLoadSubject():void {
    this.imageLoadSubject = new Subject<void>();
    this.image.onerror = () => {
      this.imageLoadSubject.error();
      this.imageLoadSubject.complete();
    };
    this.image.onload = () => {
      this.imageLoadSubject.next(null);
      this.imageLoadSubject.complete();
    };
  }

  public bodyBgLoad():Subject<void> {
    return this.imageLoadSubject;
  }

  public getBodyBgImageSizes():BgMetrics {
    let elemW = document.documentElement.clientWidth;
    let elemH = document.documentElement.clientHeight;
    if(elemW <= 640) return;
    let imgRatio = (this.image.height / this.image.width);       // original img ratio
    let containerRatio = (elemH / elemW);     // container ratio

    let finalHeight, finalWidth;
    if (containerRatio > imgRatio) {
      finalHeight = elemH;
      finalWidth = (elemH / imgRatio);
    } else {
      finalWidth = elemW;
      finalHeight = (elemW * imgRatio);
    }
    return { width: finalWidth, height: finalHeight, positionX: (elemW - finalWidth)/2, positionY: (elemH - finalHeight)/2};
  }
}
