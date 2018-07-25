import { Component, OnInit } from '@angular/core';
import {AuthentificationComponent} from "../authentification.component";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [
      AuthentificationComponent
  ]
})
export class LogoutComponent implements OnInit {

  constructor(private AuthentificationComponent: AuthentificationComponent) { }

  ngOnInit() {
  }

  logout(){
    this.AuthentificationComponent.googleLogout();
  }

}
