import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
import { FleetOwnerService } from './fleet-owner.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-fleet-owner-update',
    templateUrl: './fleet-owner-update.component.html'
})
export class FleetOwnerUpdateComponent implements OnInit {
    private _fleetOwner: IFleetOwner;
    isSaving: boolean;

    users: IUser[];
    createdAt: string;
    updatedAt: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private fleetOwnerService: FleetOwnerService,
        private userService: UserService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fleetOwner }) => {
            this.fleetOwner = fleetOwner;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.fleetOwner, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.fleetOwner.createdAt = moment(this.createdAt, DATE_TIME_FORMAT);
        this.fleetOwner.updatedAt = moment(this.updatedAt, DATE_TIME_FORMAT);
        if (this.fleetOwner.id !== undefined) {
            this.subscribeToSaveResponse(this.fleetOwnerService.update(this.fleetOwner));
        } else {
            this.subscribeToSaveResponse(this.fleetOwnerService.create(this.fleetOwner));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFleetOwner>>) {
        result.subscribe((res: HttpResponse<IFleetOwner>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get fleetOwner() {
        return this._fleetOwner;
    }

    set fleetOwner(fleetOwner: IFleetOwner) {
        this._fleetOwner = fleetOwner;
        this.createdAt = moment(fleetOwner.createdAt).format(DATE_TIME_FORMAT);
        this.updatedAt = moment(fleetOwner.updatedAt).format(DATE_TIME_FORMAT);
    }
}
