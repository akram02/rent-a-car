import { Moment } from 'moment';
import { ICarType } from 'app/shared/model//car-type.model';
import { IFleetOwner } from 'app/shared/model//fleet-owner.model';

export interface ICar {
    id?: number;
    brand?: string;
    model?: string;
    registrationNo?: string;
    imageContentType?: string;
    image?: any;
    manufacturerYear?: number;
    driverId?: number;
    createdAt?: Moment;
    updatedAt?: Moment;
    cartype?: ICarType;
    fleetowner?: IFleetOwner;
}

export class Car implements ICar {
    constructor(
        public id?: number,
        public brand?: string,
        public model?: string,
        public registrationNo?: string,
        public imageContentType?: string,
        public image?: any,
        public manufacturerYear?: number,
        public driverId?: number,
        public createdAt?: Moment,
        public updatedAt?: Moment,
        public cartype?: ICarType,
        public fleetowner?: IFleetOwner
    ) {}
}
