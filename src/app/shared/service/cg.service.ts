import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CgService {

    temp_cg = [
        {cg_id: 1, elements: [{
            id: 1,
            name: "Schuhe",
            sort: 1
        }]},

        {cg_id: 2, elements: [{
            id: 2,
            name: "Textil",
            sort: 1
        }]},

        {cg_id: 3, elements: [{
            id: 2,
            name: "Textil",
            sort: 1,
        },{
            id: 6,
            name: "Blusen/Hemden",
            sort: 2
        }]},

        {cg_id: 4, elements: [{
            id: 2,
            name: "Textil",
            sort: 1,
        },{
            id: 7,
            name: "Mäntel/Jacken",
            sort: 2
        }]},

        {cg_id: 7, elements: [{
            id: 2,
            name: "Textil",
            sort: 1,
        },{
            id: 8,
            name: "Strumpfwaren",
            sort: 2
        }]},

        {cg_id: 8, elements: [{
            id: 2,
            name: "Textil",
            sort: 1,
        },{
            id: 9,
            name: "Wäsche/Bademoden",
            sort: 2
        }]},

        {cg_id: 9, elements: [{
            id: 2,
            name: "Textil",
            sort: 1,
        },{
            id: 10,
            name: "Oberbekleidung",
            sort: 2
        }]},

        {cg_id: 10, elements: [{
            id: 2,
            name: "Textil",
            sort: 1,
        },{
            id: 11,
            name: "Beinbekleidung",
            sort: 2
        }]},

        {cg_id: 11, elements: [{
            id: 2,
            name: "Textil",
            sort: 1,
        },{
            id: 12,
            name: "Kleider/Anzüge",
            sort: 2
        }]},

        {cg_id: 12, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        }]},

        {cg_id: 13, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 13,
            name: "Gürtel",
            sort: 2
        }]},

        {cg_id: 14, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 14,
            name: "Brillen",
            sort: 2
        }]},

        {cg_id: 15, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 15,
            name: "Schmuck",
            sort: 2
        }]},

        {cg_id: 16, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 16,
            name: "Halsbekleidung",
            sort: 2
        }]},

        {cg_id: 17, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 17,
            name: "Kopfbedeckung",
            sort: 2
        }]},

        {cg_id: 18, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 18,
            name: "Taschen",
            sort: 2
        }]},

        {cg_id: 19, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 19,
            name: "Beauty",
            sort: 2
        }]},

        {cg_id: 20, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 20,
            name: "Uhren",
            sort: 2
        }]},

        {cg_id: 21, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 21,
            name: "Handbekleidung",
            sort: 2
        }]},

        {cg_id: 22, elements: [{
            id: 4,
            name: "Home",
            sort: 1,
        }]},

        {cg_id: 27, elements: [{
            id: 5,
            name: "Sonstiges",
            sort: 1,
        }]},

        {cg_id: 35, elements: [{
            id: 30,
            name: "Lebensmittel",
            sort: 1,
        }]},

        {cg_id: 36, elements: [{
            id: 3,
            name: "Accessoires",
            sort: 1,
        },{
            id: 31,
            name: "Portemonnaie",
            sort: 2
        }]},

        {cg_id: 38, elements: [{
            id: 3,
            name: "Textil",
            sort: 1,
        },{
            id: 9,
            name: "Wäsche/Bademode",
            sort: 2
        },{
            id: 33,
            name: "Multipack",
            sort: 3
        }]},
  ];
  constructor() { }

    getCG(filter?){
        this.temp_cg.sort(this.sortByName);


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

    sortByName(a,b){
        a.elements.sort(function(a,b) {
            if (a.sort < b.sort)
                return -1;
            if (a.sort > b.sort)
                return 1;
            return 0;
        });
        let cg_a = "";
        let cg_b = "";
        a.elements.forEach(item=>{
            cg_a +=item.name;
        });
        b.elements.forEach(item=>{
            cg_b +=item.name;
        });

        if (cg_a < cg_b)
            return -1;
        if (cg_a > cg_b)
            return 1;
        return 0;
    };
}
