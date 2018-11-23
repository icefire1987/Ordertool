import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Process, Processgroup} from '../interfaces/processgroup';
import {HelperService} from './helper.service';
import {HttpClient} from '@angular/common/http';
import {APIResponse} from '../interfaces/apiresponse';
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProcessService {

    temp1:Processgroup[] = [{
        processgroup_id: 1, elements: [{
            process:{
                process_id: 1,
                name: "Puppe",
                type: "Freisteller",
                department: "Foto"
            },
            sort: 1
        },{
            process:{
                process_id: 21,
                name: "PostProduction",
                type: "PostProduction",
                department: "PostProduction"
            },
            sort: 2
        },{
            process:{
                process_id: 31,
                name: "Content",
                type: "Content",
                department: "Content"
            },
            sort: 3
        }]}
    ];

    temp = [
        {
            process_id: 1,
            name: "Puppe",
            type: "Freisteller",
            department: "Foto"
        },{
            process_id: 2,
            name: "Legetisch",
            type: "Freisteller",
            department: "Foto"
        },{
            process_id: 3,
            name: "Schuhtisch",
            type: "Freisteller",
            department: "Foto"
        },{
            process_id: 4,
            name: "Cube",
            type: "Freisteller",
            department: "Foto"
        },{
            process_id: 5,
            name: "OrbitVu",
            type: "Freisteller",
            department: "Foto"
        },{
            process_id: 6,
            name: "Looklet",
            type: "Freisteller",
            department: "Foto"
        },{

            process_id: 7,
            name: "Model FS",
            type: "Model",
            department: "Foto"
        },{
            process_id: 8,
            name: "Model",
            type: "Model",
            department: "Foto"
        },{
            process_id: 10,
            name: "Looklet",
            type: "Freisteller",
            department: "Foto"
        },{
            process_id: 11,
            name: "Looklet",
            type: "Model",
            department: "Foto"
        },{
            process_id: 21,
            name: "PostProduction",
            type: "PostProduction",
            department: "PostProduction"
        },{
            process_id: 31,
            name: "Content",
            type: "Content",
            department: "Content"
        }
    ];
    currentProcessGroup:Process;

    private uri = '';
    private url_base = 'http://localhost:3000/api/v1';

    stages: any;

    constructor(private HelperService: HelperService, private http: HttpClient) { }

    get(filter?: {key, value} ): Observable<any[]> {
        this.uri = this.url_base + '/stages';
        if (filter && filter.key === 'id') {
            this.uri = this.url_base + '/stages/id/' + filter.value;
        }
        return this.http.get<APIResponse>(this.uri).pipe(
            map( (res: APIResponse) => {
                this.stages = this.HelperService.extractData(res);
                return this.stages;
            }),
            catchError(this.HelperService.handleError)

        );
    }


    getProcess(filter?) {
        return this.stages;
    }
    /*
    checkForDepartment(department_name, processgroup_id): boolean{
        let elem =  this.currentProcessGroup.filter(elem => elem.processgroup_id === processgroup_id)[0];
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
*/
    checkForDepartment(a,b) {
        return true;
    }
    getNameById(process_id) {
        let obj =  this.temp.filter(elem => elem.process_id === process_id)[0];
        if (typeof obj !== 'undefined') {
            return obj.name;
        }
        return null;
    }
    createName(processgroup: Array<any>): string{
        let name = '';

        if (processgroup.length > 0) {
            processgroup.sort();

            processgroup.forEach(process_id => {
                name += this.getNameById(process_id) + '+';
            });
            name = name.slice(0, -1);
        }



        return name;
    }
}
