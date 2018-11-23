import {Address, Customer, Order, Person} from "../interfaces/order";
import * as moment from 'moment';

export const Kunden: Customer[] = [
    {
        id:1,
        name: "Zalando"
    },
    {
        id:2,
        name:"Galeria Kaufhof"
    }
];

export const Ansprechpartner: Person[] = [
    {
        id:1,
        name: "Max Mustermann",
        phone: "030-890494910",
        customer_id: 1
    }
];