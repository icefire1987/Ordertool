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
  columnsToDisplay = ['id', 'number', 'customer','actions'];


  constructor(private orderservice: OrderService, private router: Router) { }

  ngOnInit() {
    this.getOrders();

  }

  deleteOrder(event, order){
    this.orderservice.deleteOrder(order)
        .subscribe(orders => {
          this.orders = orders;
          this.dataSource.data = this.orders;

        });

    //this.dataSource = new MatTableDataSource(this.orders);
  }

    editOrder(order){
      console.log(order)
        this.router.navigate(['protected/order',order.id]);
    }

  getOrders(): void {
    this.isLoading = true;
    this.orderservice.readOrder()
        .subscribe(orders => {
          this.orders = orders;
          this.dataSource = new MatTableDataSource(this.orders);
          this.isLoading = false;
        });
  }
}
