export interface IUser {
    email: string;
    password: string;
    activated: boolean;
    isValidPass: (candidate: string) => boolean;
}