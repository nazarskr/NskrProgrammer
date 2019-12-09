import { IPortfolio } from '../interfaces';

export class Portfolio implements IPortfolio {
    constructor(
        public name: string,
        public url: string,
        public imageUrl: string,
        public stack: string,
        public description: string,
        public date: Date
    ) {}
}
