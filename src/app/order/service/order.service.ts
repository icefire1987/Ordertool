import { Injectable } from '@angular/core';
import {Order} from '../../shared/interfaces/order';
import {APIResponse} from '../../shared/interfaces/apiresponse';

import {Observable, of, throwError} from 'rxjs';
import { delay } from 'rxjs/operators/delay';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {HelperService} from '../../shared/service/helper.service';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[];
  uri: string;
  filterkeys: string[];
  constructor(private http: HttpClient, private HelperService: HelperService) {
    this.orders = [];
  }


  url_base = 'http://localhost:3000/api/v1';

  createOrder(aOrder: Order): Observable<Order> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',

          })
      };
      if (aOrder && aOrder.id !== null) {
          this.uri = this.url_base + '/orders/' + aOrder.id;
          return this.http.put<APIResponse>(this.uri, JSON.stringify(aOrder), httpOptions).pipe(
              map(this.HelperService.extractData),
              catchError(this.HelperService.handleError)

          );
      } else {
          this.uri = this.url_base + '/orders/new';
          return this.http.post<APIResponse>(this.uri, JSON.stringify(aOrder), httpOptions).pipe(
              map(this.HelperService.extractData),
              catchError(this.HelperService.handleError)

          );
      }
  }
  readOrder(filter?: {key, value} ): Observable<Order[]> {
      this.uri = this.url_base + '/orders';
      if (filter && filter.key === 'id') {
          this.uri = this.url_base + '/orders/id/' + filter.value;
      }

      return this.http.get<APIResponse>(this.uri).pipe(
          map(this.HelperService.extractData),
          catchError(this.HelperService.handleError)

      );
  }
  updateOrder(aOrder: Order) {

  }
  deleteOrder(order: Order): Observable<Order[]> {
      if (order && order.id != null) {
          this.uri = this.url_base + '/orders/' + order.id;
          return this.http.delete<APIResponse>(this.uri).pipe(
              map(this.HelperService.extractData),
              catchError(this.HelperService.handleError)
          );
      }else {
          return null;
      }
  }


}


