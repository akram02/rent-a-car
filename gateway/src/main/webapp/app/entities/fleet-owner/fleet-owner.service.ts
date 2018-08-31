import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';

type EntityResponseType = HttpResponse<IFleetOwner>;
type EntityArrayResponseType = HttpResponse<IFleetOwner[]>;

@Injectable({ providedIn: 'root' })
export class FleetOwnerService {
    private resourceUrl = SERVER_API_URL + 'api/fleet-owners';

    constructor(private http: HttpClient) {}

    create(fleetOwner: IFleetOwner): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fleetOwner);
        return this.http
            .post<IFleetOwner>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fleetOwner: IFleetOwner): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fleetOwner);
        return this.http
            .put<IFleetOwner>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFleetOwner>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFleetOwner[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(fleetOwner: IFleetOwner): IFleetOwner {
        const copy: IFleetOwner = Object.assign({}, fleetOwner, {
            createdAt: fleetOwner.createdAt != null && fleetOwner.createdAt.isValid() ? fleetOwner.createdAt.toJSON() : null,
            updatedAt: fleetOwner.updatedAt != null && fleetOwner.updatedAt.isValid() ? fleetOwner.updatedAt.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
        res.body.updatedAt = res.body.updatedAt != null ? moment(res.body.updatedAt) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fleetOwner: IFleetOwner) => {
            fleetOwner.createdAt = fleetOwner.createdAt != null ? moment(fleetOwner.createdAt) : null;
            fleetOwner.updatedAt = fleetOwner.updatedAt != null ? moment(fleetOwner.updatedAt) : null;
        });
        return res;
    }
}
