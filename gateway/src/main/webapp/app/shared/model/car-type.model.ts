import { ICar } from 'app/shared/model//car.model';

export interface ICarType {
    id?: number;
    typeName?: string;
    cars?: ICar[];
}

export class CarType implements ICarType {
    constructor(public id?: number, public typeName?: string, public cars?: ICar[]) {}
}
