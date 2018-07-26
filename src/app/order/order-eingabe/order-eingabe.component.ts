import { Component, OnInit } from '@angular/core';
import {Address, Customer, Order, Person} from "../../shared/interfaces/order";
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {OrderService} from "../service/order.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Ansprechpartner, Kunden} from "../../shared/data/orders";
import 'rxjs/add/operator/map'
import {Observable} from "rxjs";
import {startWith, map} from "rxjs/operators";
import {CommodityGroup} from "../../shared/interfaces/commoditygroup";
import {CgService} from "../../shared/service/cg.service";
import {GenderService} from "../../shared/service/gender.service";
import {Processgroup} from "../../shared/interfaces/processgroup";
import {ProcessService} from "../../shared/service/process.service";

@Component({
  selector: 'app-order-eingabe',
  templateUrl: './order-eingabe.component.html',
  styleUrls: ['./order-eingabe.component.css']
})
export class OrderEingabeComponent implements OnInit {
    private isLoading;
    filteredOptions_ap_extern: Observable<Person[]>;
    orderInputForm: FormGroup;

    cg_defaults: CommodityGroup[];
    gender_defaults: any;
    process_defaults: Processgroup[];
    kunden: Customer[] = Kunden;
    ap_extern: Person[] = Ansprechpartner;

    filecontent: {};
    fileListener: Observable<any>;
    public retouraddress_all =
    [
        {
          kundeID: 1,
          adresses: [
            {id: 1, description: "Hauptstrasse 1 12345 Neustadt", receiver:"", receiver_sub: "",street: "", postalcode: null, city: "", country: ""},
            {id: 2, description: "Bahnhofstrasse 1 12345 Altstadt", receiver:"", receiver_sub: "",street: "", postalcode: null, city: "", country: ""}
          ]
        },
      {
        kundeID: 2,
        adresses: [
          {id: 3, description: "Am Lager 2 23456 Musterhausen", receiver:"", receiver_sub: "",street: "", postalcode: null, city: "", country: ""},
          {id: 4, description: "Am Felde 2 23456 Bergheim", receiver:"", receiver_sub: "",street: "", postalcode: null, city: "", country: ""}
        ]
      }
    ];
    public retouraddresses: Address[];

// CONSTRUCTOR
    constructor(
      private fb: FormBuilder,
      private orderService: OrderService,
      private router: Router,
      private route: ActivatedRoute,
      private CgService: CgService,
      private GenderService: GenderService,
      private ProcessService: ProcessService,
    ) {
    this.createForm();
    this.route.params
        .subscribe((params: any) => {
            if(params.id != null){
                this.getOrder({key: "id", value: params.id}).subscribe(
                    aOrder => {
                        this.orderInputForm.patchValue(aOrder);
                    }
                );

            }

        });
    }
// END CONSTRUCTOR

    createForm() {
        this.orderInputForm = this.fb.group({
            id: null,
            number: ['', Validators.required ],
            customer: [new Customer(), Validators.required ],
            retouraddress: new Address(),
            date_delivery: "",
            date_return_article: "",
            date_return_data: "",
            comment: "",
            logistik_retourap: "",
            cg: "",
            cg2: "",
            cg_set: this.fb.array([])
        });

        this.orderInputForm.get('customer').valueChanges.subscribe(val => {
          this.getRetouraddress(val.id);
        });

        this.orderInputForm.get('cg').valueChanges.subscribe(val => {
            if( val){
                this.cg_set.push(this.fb.group({
                    cg: val,
                    gender: 0,
                    amount: 0,
                    process: 0
                }));
                this.orderInputForm.get('cg').patchValue("")
            }

        });

    }



    validateSubscribe(returnedObj){
      console.log("validate")
        return returnedObj.subscribe(
            result => {return result;},
            error => {console.error(error);}
        )
    }
    getOrder(filter){
        this.isLoading = true;
        return this.orderService.readOrder(filter)
            .map(res => {
                this.isLoading = false;
                if(res.length==1){
                    return res[0];
                }else{
                    return null;
                }

            })
    }
    saveOrder(){
        //TODO
        this.orderInputForm.value.id = 9;
        this.orderService.createOrder(this.orderInputForm.value).subscribe(orders => {
            this.router.navigate(['protected/dashboard']);
        });
    }
    getRetouraddress(submittedCustomerID:any){
        for (let i = 0; i < this.retouraddress_all.length; i++) {
          if (this.retouraddress_all[i].kundeID == submittedCustomerID) {
            this.retouraddresses = this.retouraddress_all[i].adresses;
          }
        }
    }
    private filter_ap_extern(value:string):Person[]{
        let inputvalue = value.toLowerCase();
        return this.ap_extern.filter(aPerson=> aPerson.name.toLowerCase().includes(inputvalue));
    }

    private displayPersonName(person?: Person){
        return person ? person.name : null;
    }
    private checkForDepartment(department_name, processgroup_id){

        return this.ProcessService.checkForDepartment(department_name,processgroup_id);
    }
    get cg_set() {
        return this.orderInputForm.get('cg_set') as FormArray;
    }

    readFilecontent($event){
        console.log($event);
    }

    ngOnInit() {
        // Eventlistener
        this.filteredOptions_ap_extern = this.orderInputForm.get('logistik_retourap').valueChanges
            .pipe(
                startWith(""),
                map(value => {
                    if(typeof value == "string"){
                        return this.filter_ap_extern(value)
                    }else{
                        return this.ap_extern
                    }
                })
            );





        this.CgService.getCG().subscribe(val => this.cg_defaults = val);
        this.GenderService.getGender().subscribe(val => this.gender_defaults = val);
        this.ProcessService.getProcess().subscribe( val => this.process_defaults = val);

    }

    // Object as Selectvalue
    compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
    compareByValue(f1: any, f2: any) {
        return f1 && f2 && f1.value === f2.value;
    }

}
