import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICarType } from 'app/shared/model/car-type.model';

type EntityResponseType = HttpResponse<ICarType>;
type EntityArrayResponseType = HttpResponse<ICarType[]>;

@Injectable({ providedIn: 'root' })
export class CarTypeService {
    private resourceUrl = SERVER_API_URL + 'api/car-types';

    constructor(private http: HttpClient) {}

    create(carType: ICarType): Observable<EntityResponseType> {
        return this.http.post<ICarType>(this.resourceUrl, carType, { observe: 'response' });
    }

    update(carType: ICarType): Observable<EntityResponseType> {
        return this.http.put<ICarType>(this.resourceUrl, carType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICarType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICarType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
