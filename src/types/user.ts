export interface IUser {
    email: string;
    password: string;
    activated: boolean;
    first_name: string;
    last_name: string;
    birthday: Number;
    sex: 0 | 1 | -1;
    phone: {
        data: string;
        show: boolean;
    },
    vkontakte:{
        data: string;
        show: boolean;
    },
    facebook: {
        data: string;
        show: boolean;
    },
    intagram: {
        data: string;
        show: boolean;
    },
    isValidPass: (candidate: string) => boolean;
}