import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CgService {

  temp_cg = [
    {
      cg_id: 1,
      elements: [
        {
          id: 1,
          name: "Schuhe",
          sort: 1
        },
        {
          id: 21,
          name: "Sneakers",
          sort: 2
        }
      ]
    },
    {
      cg_id: 2,
      elements: [
        {
          id: 1,
          name: "Textil",
          sort: 1
        },
        {
          id: 21,
          name: "Oberbekleidung",
          sort: 2
        }
      ]
    },
    {
      cg_id: 3,
      elements: [
        {
          id: 1,
          name: "Textil",
          sort: 1
        },
        {
          id: 21,
          name: "Oberbekleidung",
          sort: 2
        },
        {
          id: 31,
          name: "Hemden",
          sort: 3
        }
      ]
    },
  ];
  constructor() { }

  getCG(filter?){
    return of(this.temp_cg);
  };
  getNameById(id: number){
    let obj =  this.temp_cg.filter(elem => elem.cg_id === id)[0];
    if(typeof obj != "undefined"){
      let name = "";
      obj.elements.forEach( elem => {name += elem.name + "-"});
      name = name.slice(0,-1);
      return name;
    }else{
      return "";
    }


  };

}
