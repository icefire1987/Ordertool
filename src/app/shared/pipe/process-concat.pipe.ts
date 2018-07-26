import { Pipe, PipeTransform } from '@angular/core';
import {Process} from "../interfaces/processgroup";

@Pipe({
  name: 'processConcat'
})
export class ProcessConcatPipe implements PipeTransform {

  transform(value: Array<{process: Process, sort: number}>, args?: any): any {
    let concat_string = "";
    for(let child of value){
      let separator = "+";
      let viewValue = child.process.name;
      concat_string += viewValue + separator;
    }
    return concat_string.slice(0, -1);
  }

}
