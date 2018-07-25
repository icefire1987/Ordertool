import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthentificationComponent } from './authentification.component';
import {AuthService} from "./service/auth.service";
import {AuthGuardService} from "./service/auth-guard.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoginComponent,
        AuthentificationComponent,
        LogoutComponent
    ],
    providers: [
        AuthService,
        AuthGuardService,
        JwtHelperService
    ]
})
export class AuthentificationModule {

}
