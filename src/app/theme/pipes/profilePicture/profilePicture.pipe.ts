import {Pipe, PipeTransform} from 'angular2/core';
import {layoutPaths} from '../../../theme';

@Pipe({name: 'profilePicture'})
export class ProfilePicturePipe implements PipeTransform {

  transform(input:string, ext = 'png'):string {
    return layoutPaths.images.profile + input + '.' + ext;
  }
}
