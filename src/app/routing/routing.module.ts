import { NgModule } from '@angular/core';

import { RouterModule, Routes }  from '@angular/router';

import {DashboardComponent} from "../dashboard/dashboard.component";
import {AuthGuardService} from "../authentification/service/auth-guard.service";
import {AuthentificationComponent} from "../authentification/authentification.component";
import {PageNotFoundComponent} from "../components-basic/page-not-found/page-not-found.component";
import {AuthentificationModule} from "../authentification/authentification.module";
import {OrderEingabeComponent} from "../order/order-eingabe/order-eingabe.component";
import {NavWrapperComponent} from "../nav-wrapper/nav-wrapper.component";
import {VerwaltungComponent} from "../verwaltung/verwaltung.component";

const appRoutes: Routes = [

  { path: '',
    redirectTo: '/protected',
    pathMatch: 'full'
  },
  {
    path: 'protected',
    component: NavWrapperComponent,
    //canActivate: [AuthGuardService]
    children: [
      {
        path: '',
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,


          },
          {
            path: 'order',
            component: OrderEingabeComponent,
          },
          {
            path: 'order/:id',
            component: OrderEingabeComponent,
          },
          {
            path: 'admin',
            component: VerwaltungComponent,


          },
          {
            path: '',
            component: DashboardComponent,


          },
        ]
      }

    ]
  },
  {
    path: 'login',
    component: AuthentificationComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
      AuthentificationModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
