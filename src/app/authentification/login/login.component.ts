import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/interfaces/user";
import {AuthService} from "../service/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService]
})
export class LoginComponent implements OnInit {

    constructor() {
        console.log("loginCompConstr")
    }

    ngOnInit() {
        console.log("loginCompInit")
    }

    public onSignIn() {
        console.log("logonOnSignIn")
    }
}
