export class Order {
    id: number;
    number: string;
    customer: Customer;
    retouraddress: Address;
    date_delivery: any;
    date_return_data: any;
    date_return_article: any;
    comment: string;
}
export class Address {
    id: number;
    description: string;
    receiver: string;
    receiver_sub: string;
    street: string;
    postalcode: number;
    city: string;
    country: string;
}

export class Customer {
    id: number;
    name: string;
}
export class Person {
    id: number;
    name: string;
    phone: string;
    customer_id: number;
}