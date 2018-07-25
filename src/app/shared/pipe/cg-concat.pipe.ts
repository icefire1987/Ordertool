import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cgConcat'
})
export class CgConcatPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        let concat_string = "";
        for(let child of value){
            let separator = " - ";
            let viewValue = child.name;
            if(args){
                if(args && args.splitlength && args.splitlength>0) {
                    if (child.name.length < (args.splitlength + 3)) {
                        // nur minimal länger, lieber Leerzeichen kürzen
                        separator = "-";
                    }else if(child.name.length - child.name.match(/[aeiou]/gi).length < (args.splitlength + 3)){
                        viewValue = child.name.replace(/[aeiou]/ig,'')
                    }else{
                        viewValue = child.name.substring(0,args.splitlength);
                    }
                }
            }
            concat_string += viewValue + separator;
        }
        return concat_string.slice(0,-3);
    }

}
