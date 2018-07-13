import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwnMaterialModule } from "./own-material/own-material.module";

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './components-basic/page-not-found/page-not-found.component';

import {AuthentificationModule} from "./authentification/authentification.module";

import {RoutingModule} from "./routing/routing.module";
import { OrderEingabeComponent } from './order/order-eingabe/order-eingabe.component';
import { NavWrapperComponent } from './nav-wrapper/nav-wrapper.component';
import { VerwaltungComponent } from './verwaltung/verwaltung.component';

import { OrderService } from './order/service/order.service';
import { OrderListComponent } from './order/order-list/order-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material";
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [
      AppComponent,
      DashboardComponent,
      PageNotFoundComponent,
      OrderEingabeComponent,
      NavWrapperComponent,
      VerwaltungComponent,
      OrderListComponent,
      CommentComponent

  ],
  imports: [
        BrowserModule,
        BrowserAnimationsModule,
        OwnMaterialModule,
        AuthentificationModule,
        RoutingModule,
        FormsModule, ReactiveFormsModule,
      MatMomentDateModule
  ],
  providers: [
      OrderService,
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
