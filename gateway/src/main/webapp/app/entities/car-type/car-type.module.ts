import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    CarTypeComponent,
    CarTypeDetailComponent,
    CarTypeUpdateComponent,
    CarTypeDeletePopupComponent,
    CarTypeDeleteDialogComponent,
    carTypeRoute,
    carTypePopupRoute
} from './';

const ENTITY_STATES = [...carTypeRoute, ...carTypePopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CarTypeComponent,
        CarTypeDetailComponent,
        CarTypeUpdateComponent,
        CarTypeDeleteDialogComponent,
        CarTypeDeletePopupComponent
    ],
    entryComponents: [CarTypeComponent, CarTypeUpdateComponent, CarTypeDeleteDialogComponent, CarTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCarTypeModule {}
