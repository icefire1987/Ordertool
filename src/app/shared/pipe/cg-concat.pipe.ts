import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cgConcat'
})
export class CgConcatPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        value.sort(this.sortBySort);

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
                        let first = child.name.substring(0,1);
                        let aString = child.name.substring(1,child.name.length);
                        viewValue = first + aString.replace(/[aeiou]/ig,'');
                    }else{
                        viewValue = child.name.substring(0,args.splitlength);
                    }
                }
            }
            concat_string += viewValue + separator;
        }
        return concat_string.slice(0,-3);
    }

    sortBySort(a,b){
        if (a.sort < b.sort)
            return -1;
        if (a.sort > b.sort)
            return 1;
        return 0;
    }

}
