import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
import { FleetOwnerService } from './fleet-owner.service';

@Component({
    selector: 'jhi-fleet-owner-delete-dialog',
    templateUrl: './fleet-owner-delete-dialog.component.html'
})
export class FleetOwnerDeleteDialogComponent {
    fleetOwner: IFleetOwner;

    constructor(private fleetOwnerService: FleetOwnerService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fleetOwnerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fleetOwnerListModification',
                content: 'Deleted an fleetOwner'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fleet-owner-delete-popup',
    template: ''
})
export class FleetOwnerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fleetOwner }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FleetOwnerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.fleetOwner = fleetOwner;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
