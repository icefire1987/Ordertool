import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HelperService} from './helper.service';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../interfaces/order';
import {APIResponse} from '../interfaces/apiresponse';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
    private uri = '';
    private url_base = 'http://localhost:3000/api/v1';

    gender: any;

    constructor(private HelperService: HelperService, private http: HttpClient) { }

    get(filter?: {key, value} ): Observable<any[]> {
        this.uri = this.url_base + '/gender';
        if (filter && filter.key === 'id') {
            this.uri = this.url_base + '/gender/id/' + filter.value;
        }
        return this.http.get<APIResponse>(this.uri).pipe(
            map( (res: APIResponse) => {
                this.gender = this.HelperService.extractData(res);
                return this.gender;
            }),
            catchError(this.HelperService.handleError)

        );
    }


    getNameById(id: number){
        if (typeof this.gender === 'undefined' || !~('length' in this.gender) ) {
            return '';
        }
        let obj =  this.gender.filter(elem => elem.id === id)[0];
        if (typeof obj !== 'undefined') {
            return obj.name;
        }
        return null;
    };
}
