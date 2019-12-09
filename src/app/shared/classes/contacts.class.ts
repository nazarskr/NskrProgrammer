import { IContact } from '../interfaces';

export class Contact implements IContact {
    constructor(
        public date: Date,
        public name: string,
        public email: string,
        public message: string
    ) {}
}
