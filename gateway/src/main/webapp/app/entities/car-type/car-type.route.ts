import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarType } from 'app/shared/model/car-type.model';
import { CarTypeService } from './car-type.service';
import { CarTypeComponent } from './car-type.component';
import { CarTypeDetailComponent } from './car-type-detail.component';
import { CarTypeUpdateComponent } from './car-type-update.component';
import { CarTypeDeletePopupComponent } from './car-type-delete-dialog.component';
import { ICarType } from 'app/shared/model/car-type.model';

@Injectable({ providedIn: 'root' })
export class CarTypeResolve implements Resolve<ICarType> {
    constructor(private service: CarTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((carType: HttpResponse<CarType>) => carType.body));
        }
        return of(new CarType());
    }
}

export const carTypeRoute: Routes = [
    {
        path: 'car-type',
        component: CarTypeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gatewayApp.carType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car-type/:id/view',
        component: CarTypeDetailComponent,
        resolve: {
            carType: CarTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.carType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car-type/new',
        component: CarTypeUpdateComponent,
        resolve: {
            carType: CarTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.carType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car-type/:id/edit',
        component: CarTypeUpdateComponent,
        resolve: {
            carType: CarTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.carType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carTypePopupRoute: Routes = [
    {
        path: 'car-type/:id/delete',
        component: CarTypeDeletePopupComponent,
        resolve: {
            carType: CarTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.carType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
