import { IBlog } from '../interfaces';

export class Blog implements IBlog {
    constructor(
        public date: Date,
        public title: string,
        public imageUrl: string,
        public content: string
    ) {}
}
