export interface IUser {
    email: string;
    password: string;
    isValidPass: (candidate: string) => boolean;
}