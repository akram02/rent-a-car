import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FleetOwner } from 'app/shared/model/fleet-owner.model';
import { FleetOwnerService } from './fleet-owner.service';
import { FleetOwnerComponent } from './fleet-owner.component';
import { FleetOwnerDetailComponent } from './fleet-owner-detail.component';
import { FleetOwnerUpdateComponent } from './fleet-owner-update.component';
import { FleetOwnerDeletePopupComponent } from './fleet-owner-delete-dialog.component';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';

@Injectable({ providedIn: 'root' })
export class FleetOwnerResolve implements Resolve<IFleetOwner> {
    constructor(private service: FleetOwnerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fleetOwner: HttpResponse<FleetOwner>) => fleetOwner.body));
        }
        return of(new FleetOwner());
    }
}

export const fleetOwnerRoute: Routes = [
    {
        path: 'fleet-owner',
        component: FleetOwnerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fleetOwner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fleet-owner/:id/view',
        component: FleetOwnerDetailComponent,
        resolve: {
            fleetOwner: FleetOwnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fleetOwner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fleet-owner/new',
        component: FleetOwnerUpdateComponent,
        resolve: {
            fleetOwner: FleetOwnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fleetOwner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fleet-owner/:id/edit',
        component: FleetOwnerUpdateComponent,
        resolve: {
            fleetOwner: FleetOwnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fleetOwner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fleetOwnerPopupRoute: Routes = [
    {
        path: 'fleet-owner/:id/delete',
        component: FleetOwnerDeletePopupComponent,
        resolve: {
            fleetOwner: FleetOwnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fleetOwner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
