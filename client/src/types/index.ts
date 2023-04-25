export interface IResponse {
    message: string;
}

export interface IServerResponse<T> extends IResponse {
    data: T;
}

export interface ILoginPayload {
    email: string;
    password: string;
}
export interface IRegisterPayload {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ITemplate {
    _id: string;
    name: string;
    size: string;
    createdAt: string;
}

export interface IDocParams {
    [key: string]: any;
}
