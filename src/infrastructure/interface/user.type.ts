import { User } from "@prisma/client";

export interface UserType extends User {

}

export interface UserCreate {
    name: string;
    lastname: string;
    email: string;
    password: string;
    age: number;
    acceptEmail: "si" | "no";
}
