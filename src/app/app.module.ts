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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialogModule} from "@angular/material";
import { CommentComponent } from './comment/comment.component';
import { CgConcatPipe } from './shared/pipe/cg-concat.pipe';
import { CgdropdownComponent } from './cgdropdown/cgdropdown.component';
import { GenderdropdownComponent } from './genderdropdown/genderdropdown.component';
import { ProcessdropdownComponent } from './processdropdown/processdropdown.component';
import { ProcessConcatPipe } from './shared/pipe/process-concat.pipe';
import { UploadComponent } from './file/upload/upload.component';
import {DialogPreviewComponent} from "./file/dialog-preview/dialog-preview.component";
import { HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [
      AppComponent,
      DashboardComponent,
      PageNotFoundComponent,
      OrderEingabeComponent,
      NavWrapperComponent,
      VerwaltungComponent,
      OrderListComponent,
      CommentComponent,
      CgConcatPipe,
      CgdropdownComponent,
      GenderdropdownComponent,
      ProcessdropdownComponent,
      ProcessConcatPipe,
      UploadComponent,
      DialogPreviewComponent,


    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        OwnMaterialModule,
        AuthentificationModule,
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatMomentDateModule,
        MatDialogModule,
        HttpClientModule
    ],
    providers: [
      OrderService,
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}
      ],
    entryComponents: [
        DialogPreviewComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
