import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order/service/order.service";
import {MatTableDataSource} from "@angular/material";
import {Order} from "../shared/interfaces/order";
import { Observable }        from 'rxjs';
import {finalize} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  orders: Order[];
  dataSource: MatTableDataSource<Order>;
  columnsToDisplay = ['id', 'number', 'customer', 'actions'];


  constructor(private orderservice: OrderService, private router: Router) { }

  ngOnInit() {
    this.getOrders();

  }

  deleteOrder(event, order) {
    event.stopPropagation();
    this.orderservice.deleteOrder(order)
        .subscribe(orders => {
            this.orders = this.orders.filter(el => el !== order );
            this.dataSource.data = this.orders;

        });
  }

    editOrder(order: Order) {
      if (order.hasOwnProperty('id')) {
          this.router.navigate(['protected/order', order.id]);
      }else {
          this.router.navigate(['protected/dashboard']);
      }
    }

  getOrders(): void {
    this.isLoading = true;
    this.orderservice.readOrder()
        .subscribe(orders => {
            console.log(orders);
          this.orders = orders;
          this.dataSource = new MatTableDataSource(this.orders);
          this.isLoading = false;
        });
  }
}
