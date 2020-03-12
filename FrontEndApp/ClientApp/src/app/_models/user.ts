import { Role } from './role';

export class User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    country: string;
    password: string;
    role: Role;
    token?: string;
}
