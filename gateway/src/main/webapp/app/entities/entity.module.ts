import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayFleetOwnerModule } from './fleet-owner/fleet-owner.module';
import { GatewayCarModule } from './car/car.module';
import { GatewayCarTypeModule } from './car-type/car-type.module';
import { GatewayDriverModule } from './driver/driver.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GatewayFleetOwnerModule,
        GatewayCarModule,
        GatewayCarTypeModule,
        GatewayDriverModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
