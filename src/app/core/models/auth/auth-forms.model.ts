export interface LOGIN_FORM_DATA {
    email: string;
    password: string
}
export interface REGISTER_FORM_DATA extends LOGIN_FORM_DATA {
    firstName: string;
    lasttName: string;
    address: string;
    phone: string;
    passwordConfirm?: string;
}

export interface GENERATE_KEY_FORM_DATA {
    name: string;
    platform: string;
    userId: number;
}