import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ICar } from 'app/shared/model//car.model';
import { IDriver } from 'app/shared/model//driver.model';

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export interface IFleetOwner {
    id?: number;
    companyName?: string;
    gender?: Gender;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    country?: string;
    imageContentType?: string;
    image?: any;
    createdAt?: Moment;
    updatedAt?: Moment;
    user?: IUser;
    cars?: ICar[];
    drivers?: IDriver[];
}

export class FleetOwner implements IFleetOwner {
    constructor(
        public id?: number,
        public companyName?: string,
        public gender?: Gender,
        public phone?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public city?: string,
        public country?: string,
        public imageContentType?: string,
        public image?: any,
        public createdAt?: Moment,
        public updatedAt?: Moment,
        public user?: IUser,
        public cars?: ICar[],
        public drivers?: IDriver[]
    ) {}
}
