import { User } from "@prisma/client";


export class UserEntity implements User {
    id: number;
    name: string;
    surname: string;
    email: string;
    telephone: string;
    password: string;
    confirmPassword: string;
    admin: boolean;
    createdAt: Date;
}