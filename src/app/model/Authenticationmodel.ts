export interface RegisterModel {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isActive?: boolean;
}

export interface loginModel {
    username: string;
    password: string;
}