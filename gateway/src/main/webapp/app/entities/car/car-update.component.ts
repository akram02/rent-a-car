import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ICar } from 'app/shared/model/car.model';
import { CarService } from './car.service';
import { ICarType } from 'app/shared/model/car-type.model';
import { CarTypeService } from 'app/entities/car-type';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
import { FleetOwnerService } from 'app/entities/fleet-owner';

@Component({
    selector: 'jhi-car-update',
    templateUrl: './car-update.component.html'
})
export class CarUpdateComponent implements OnInit {
    private _car: ICar;
    isSaving: boolean;

    cartypes: ICarType[];

    fleetowners: IFleetOwner[];
    createdAt: string;
    updatedAt: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private carService: CarService,
        private carTypeService: CarTypeService,
        private fleetOwnerService: FleetOwnerService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ car }) => {
            this.car = car;
        });
        this.carTypeService.query().subscribe(
            (res: HttpResponse<ICarType[]>) => {
                this.cartypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.fleetOwnerService.query().subscribe(
            (res: HttpResponse<IFleetOwner[]>) => {
                this.fleetowners = res.body;
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
        this.dataUtils.clearInputImage(this.car, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.car.createdAt = moment(this.createdAt, DATE_TIME_FORMAT);
        this.car.updatedAt = moment(this.updatedAt, DATE_TIME_FORMAT);
        if (this.car.id !== undefined) {
            this.subscribeToSaveResponse(this.carService.update(this.car));
        } else {
            this.subscribeToSaveResponse(this.carService.create(this.car));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>) {
        result.subscribe((res: HttpResponse<ICar>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCarTypeById(index: number, item: ICarType) {
        return item.id;
    }

    trackFleetOwnerById(index: number, item: IFleetOwner) {
        return item.id;
    }
    get car() {
        return this._car;
    }

    set car(car: ICar) {
        this._car = car;
        this.createdAt = moment(car.createdAt).format(DATE_TIME_FORMAT);
        this.updatedAt = moment(car.updatedAt).format(DATE_TIME_FORMAT);
    }
}
