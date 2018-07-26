import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Processgroup} from "../interfaces/processgroup";
@Injectable({
  providedIn: 'root'
})
export class ProcessService {

    temp:Processgroup[] = [
        {
            processgroup_id: 1,
            elements: [
                {
                    process:{
                        process_id: 11,
                        name: "Puppe",
                        type: "Freisteller",
                        department: "Foto"
                    },
                    sort: 1
                },
                {
                    process:{
                        process_id: 11,
                        name: "Content",
                        type: "Content",
                        department: "Content"
                    },
                    sort: 2
                }
            ]
        },
        {
            processgroup_id: 2,
            elements: [
                {
                    process:{
                        process_id: 11,
                        name: "Looklet",
                        type: "Freisteller",
                        department: "Foto"
                    },
                    sort: 1
                },
                {
                    process:{
                        process_id: 11,
                        name: "Detailansicht",
                        type: "Model",
                        department: "Foto"
                    },
                    sort: 2
                }
            ]
        }
    ];

    constructor() { }

    getProcess(filter?){
        return of(this.temp);
    };
    checkForDepartment(department_name, processgroup_id): boolean{
        let elem =  this.temp.filter(elem => elem.processgroup_id === processgroup_id)[0];
        if(typeof elem != "undefined"){
            return elem.elements.some( elem => {
                return elem.process.department === department_name;
            });
        }else{
            return false;
        }

    }
    getNameById(id: number){
        let obj =  this.temp.filter(elem => elem.processgroup_id === id)[0];
        if(typeof obj != "undefined"){
            let name = "";
            obj.elements.forEach( elem => {name += elem.process.name + "+"});
            name = name.slice(0,-1);
            return name;
        }else{
            return "";
        }


    };

}
