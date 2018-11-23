import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HelperService} from './helper.service';
import {HttpClient} from '@angular/common/http';
import {APIResponse} from '../interfaces/apiresponse';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CgService {
    private uri = '';
    private url_base = 'http://localhost:3000/api/v1';

    cg_sets: any;

    constructor(private HelperService: HelperService, private http: HttpClient) { }

    get(filter?: {key, value} ): Observable<any[]> {
        this.uri = this.url_base + '/cg';
        if (filter && filter.key === 'id') {
            this.uri = this.url_base + '/cg/id/' + filter.value;
        }
        return this.http.get<APIResponse>(this.uri).pipe(
            map( (res: APIResponse) => {
                this.cg_sets = this.HelperService.extractData(res);
                return this.cg_sets;
            }),
            catchError(this.HelperService.handleError)

        );
    }

    getNameById(id: number) {
        if (typeof this.cg_sets === 'undefined' || !~('length' in this.cg_sets) ) {
            return '';
        }
        let obj =  this.cg_sets.filter(elem => elem.cg_id === id)[0];
        if(typeof obj !== 'undefined'){
          let name = '';
          obj.elements.forEach( elem => {name += elem.name + '-'});
          name = name.slice(0, -1);
          return name;
        }else{
          return '';
        }
    };

    sortByName(a,b){
        a.elements.sort(function(a,b) {
            if (a.sort < b.sort)
                return -1;
            if (a.sort > b.sort)
                return 1;
            return 0;
        });
        let cg_a = "";
        let cg_b = "";
        a.elements.forEach(item=>{
            cg_a +=item.name;
        });
        b.elements.forEach(item=>{
            cg_b +=item.name;
        });

        if (cg_a < cg_b)
            return -1;
        if (cg_a > cg_b)
            return 1;
        return 0;
    };
}
