import { Injectable } from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import {User} from "../../shared/interfaces/user";


@Injectable()
export class AuthService {
    public user: User ;

    constructor() {
        this.setUser({id:1, name: "Chris", isLoggedIn: true})
    }


    jwtHelper: JwtHelper = new JwtHelper();

    setUser(user: User) {
        this.user = user;
    }
    getCurrentUser() {
        return this.user;
    }
    public isAuthenticated(): boolean {

        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return token != null && !this.jwtHelper.isTokenExpired(token);
    }


}
