import { ILogin } from '../interfaces';

export class Login implements ILogin {
    constructor(
        public login: string,
        public password: string
    ) {}
}
