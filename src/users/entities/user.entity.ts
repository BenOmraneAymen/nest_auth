import { Prisma } from "@prisma/client";
import { isEmail } from "class-validator";

export class User implements Prisma.UserCreateInput {
    id: number;
    username: string;
    email: string;
    password: string;
    isActive: boolean;
    isSuspended:boolean;
}
