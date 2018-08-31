import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFleetOwner } from 'app/shared/model/fleet-owner.model';

@Component({
    selector: 'jhi-fleet-owner-detail',
    templateUrl: './fleet-owner-detail.component.html'
})
export class FleetOwnerDetailComponent implements OnInit {
    fleetOwner: IFleetOwner;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fleetOwner }) => {
            this.fleetOwner = fleetOwner;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
