import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor() { }

  private temp_gender = [
      {id: 0, name: "Uni", icon: ""},
      {id: 1, name: "Mann", icon: ""},
      {id: 2, name: "Frau", icon: ""},
      {id: 3, name: "Kind", icon: ""},
      {id: 4, name: "Junge", icon: ""},
      {id: 5, name: "Mädchen", icon: ""},
  ]

    getGender(filter?){
        return of(this.temp_gender);
    };
    getNameById(id: number){
        let obj =  this.temp_gender.filter(elem => elem.id === id)[0];
        return obj.name;
    };
}
