import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {AuthService} from "./service/auth.service";


declare const gapi: any;

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit,AfterViewInit {

    constructor(private AuthService: AuthService) {

    }

    public auth2: any;
    public auth2Obj: any;



    public googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: environment.auth.google.client_id,
                cookiepolicy: 'single_host_origin'
            });
            this.auth2.attachClickHandler(
                document.getElementById('googleSignInButton'),
                (data) => {
                    console.log("first")
                },
                (userGoogle) => {

                    let profile = userGoogle.getBasicProfile();
                    // ID-Alternative
                    this.AuthService.setUser({id: 0 , name: profile.ig, isLoggedIn: true});
                    console.log(this.AuthService.user)
                },
                (err) => {
                    console.error(err);
                }
            );


      });

    }

    public googleLogout(){
        this.auth2Obj = gapi.auth2.getAuthInstance();
        this.auth2Obj.signOut().then(
            data => {
                console.info(data)
            },
            err => {
                console.error(err);
            }
        );
    }

    public google_onSignIn() {

    }
    ngOnInit() {

    }

    ngAfterViewInit() {
        console.log("sseebb")
        console.log(environment.auth.google.client_id)
        this.googleInit();
    }

}
