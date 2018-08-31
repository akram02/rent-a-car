import { Moment } from 'moment';
import { ICar } from 'app/shared/model//car.model';
import { IFleetOwner } from 'app/shared/model//fleet-owner.model';

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export interface IDriver {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: Gender;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    country?: string;
    licenseNo?: string;
    licenseImageContentType?: string;
    licenseImage?: any;
    nid?: string;
    nidImageContentType?: string;
    nidImage?: any;
    imageContentType?: string;
    image?: any;
    createdAt?: Moment;
    updatedAt?: Moment;
    car?: ICar;
    fleetowner?: IFleetOwner;
}

export class Driver implements IDriver {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public gender?: Gender,
        public phone?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public city?: string,
        public country?: string,
        public licenseNo?: string,
        public licenseImageContentType?: string,
        public licenseImage?: any,
        public nid?: string,
        public nidImageContentType?: string,
        public nidImage?: any,
        public imageContentType?: string,
        public image?: any,
        public createdAt?: Moment,
        public updatedAt?: Moment,
        public car?: ICar,
        public fleetowner?: IFleetOwner
    ) {}
}
