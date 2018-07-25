import {User} from "./user";
export interface Commentary {
    id: number;
    author: User;
    message: string;
    date_create: any;
    date_update:  any;
    type_comment: string;
    order_id: number;
}