import { Injectable } from '@angular/core';
import {Order} from '../../shared/interfaces/order';
import {APIResponse} from '../../shared/interfaces/apiresponse';
import {ORDERS} from '../../shared/data/orders';
import {Observable, of, throwError} from 'rxjs';
import { delay } from 'rxjs/operators/delay';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[];
  uri: string;
  filterkeys: string[];
  constructor(private http: HttpClient) {
    this.orders = ORDERS;
  }


  url_base = 'http://localhost:3000/api/v1';

  createOrder(aOrder: Order): Observable<Order> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',

          })
      };
      this.uri = this.url_base + '/orders/new';
      return this.http.post<Order[]>(this.uri, JSON.stringify(aOrder), httpOptions).pipe(
          map(this.extractData),
          catchError(this.handleError)

      );
  }
  readOrder(filter?: {key, value} ): Observable<Order[]> {
      this.uri = this.url_base + '/orders';
      if (filter && filter.key === 'id') {
          this.uri = this.url_base + '/orders/id/' + filter.value;
      }

      return this.http.get<Order[]>(this.uri).pipe(
          map(this.extractData),
          catchError(this.handleError)

      );
  }
  updateOrder(aOrder: Order) {

  }
  deleteOrder(order: Order): Observable<Order[]> {
      if (order && order.id != null) {
          this.uri = this.url_base + '/orders/' + order.id;
          return this.http.delete<APIResponse>(this.uri).pipe(
              map(this.extractData),
              catchError(this.handleError)
          );
      }else {
          return null;
      }
  }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    private extractData(res: APIResponse) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        return res.response || { };
    }
}


