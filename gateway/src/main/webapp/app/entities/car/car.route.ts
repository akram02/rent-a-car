import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from 'app/shared/model/car.model';
import { CarService } from './car.service';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { CarUpdateComponent } from './car-update.component';
import { CarDeletePopupComponent } from './car-delete-dialog.component';
import { ICar } from 'app/shared/model/car.model';

@Injectable({ providedIn: 'root' })
export class CarResolve implements Resolve<ICar> {
    constructor(private service: CarService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((car: HttpResponse<Car>) => car.body));
        }
        return of(new Car());
    }
}

export const carRoute: Routes = [
    {
        path: 'car',
        component: CarComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gatewayApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car/:id/view',
        component: CarDetailComponent,
        resolve: {
            car: CarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car/new',
        component: CarUpdateComponent,
        resolve: {
            car: CarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car/:id/edit',
        component: CarUpdateComponent,
        resolve: {
            car: CarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.car.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carPopupRoute: Routes = [
    {
        path: 'car/:id/delete',
        component: CarDeletePopupComponent,
        resolve: {
            car: CarResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.car.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
