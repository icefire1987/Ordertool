import { Injectable } from '@angular/core';
import {Customer, Order} from '../interfaces/order';
import {Observable} from 'rxjs';
import {APIResponse} from '../interfaces/apiresponse';
import {catchError, map} from 'rxjs/operators';
import {HelperService} from './helper.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url_base = 'http://localhost:3000/api/v1';
  private uri ;
  constructor(private HelperService: HelperService, private http: HttpClient) { }

    get(filter?: {key, value} ): Observable<Customer[]> {
        this.uri = this.url_base + '/customer';
        if (filter && filter.key === 'id') {
            this.uri = this.url_base + '/customer/id/' + filter.value;
        }
        return this.http.get<APIResponse>(this.uri).pipe(
            map(this.HelperService.extractData),
            catchError(this.HelperService.handleError)

        );
    }
}
