import {Address, Customer, Order, Person} from "../interfaces/order";
import * as moment from 'moment';

export const ORDERS: Order[] = [
    {
        id:1,
        number:"AB123CD",
        customer: {id:1, name:"Zalando"},
        retouraddress: new Address(),
        date_delivery: moment("2018-06-07"),
        date_return_article: moment("2018-06-07"),
        date_return_data: moment("2018-06-07"),
        comment: "Zal Test"
    },
    {
        id:2,
        number:"XY124DE",
        customer:{id:2, name:"Galeria Kaufhof"},
        retouraddress: new Address(),
        date_delivery: moment("2018-06-07"),
        date_return_article: moment("2018-06-07"),
        date_return_data: moment("2018-06-07"),
        comment: "Test"
    }
];
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