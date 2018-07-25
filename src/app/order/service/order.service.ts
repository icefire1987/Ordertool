import { Injectable } from '@angular/core';
import {Order} from "../../shared/interfaces/order";
import {ORDERS} from "../../shared/data/orders";
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators/delay';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[];
  filterkeys: string[];
  constructor() {
    this.orders = ORDERS;
  }

  createOrder(aOrder: Order): Observable<Order[]>{
    this.orders.push(aOrder);
    return of(this.orders);
  }
  readOrder(filter?: {key,value} ): Observable<Order[]>{
    this.filterkeys =  ["id"];
    if(typeof filter != 'undefined' && Object.keys(filter).length>0 && filter.hasOwnProperty("key")){
      if(this.filterkeys.indexOf(filter.key)>-1){
        let orders_filter = this.orders.filter(x => x[filter.key] == filter.value);
        return of(orders_filter).pipe(
            delay(500)
        );
      }else{

      }
    }
    return of(this.orders).pipe(
        delay(1000)
    );
  }
  updateOrder(aOrder: Order){

  }
  deleteOrder(order: Order): Observable<Order[]>{
    this.orders = this.orders.filter(x => x !== order);
    return of(this.orders);
  }


}
