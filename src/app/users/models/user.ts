import { Expression } from "@angular/compiler";

export class User {
    user_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
    birthdate: string;
    favorites: Expression[];

    constructor(name: string, email: string, password: string) {
        this.user_name = name;
        this.user_email = email;
        this.user_password = password;
        this.user_id = Math.random();
    }
}
