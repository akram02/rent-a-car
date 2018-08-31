import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { GatewayAdminModule } from 'app/admin/admin.module';
import {
    FleetOwnerComponent,
    FleetOwnerDetailComponent,
    FleetOwnerUpdateComponent,
    FleetOwnerDeletePopupComponent,
    FleetOwnerDeleteDialogComponent,
    fleetOwnerRoute,
    fleetOwnerPopupRoute
} from './';

const ENTITY_STATES = [...fleetOwnerRoute, ...fleetOwnerPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, GatewayAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FleetOwnerComponent,
        FleetOwnerDetailComponent,
        FleetOwnerUpdateComponent,
        FleetOwnerDeleteDialogComponent,
        FleetOwnerDeletePopupComponent
    ],
    entryComponents: [FleetOwnerComponent, FleetOwnerUpdateComponent, FleetOwnerDeleteDialogComponent, FleetOwnerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFleetOwnerModule {}
