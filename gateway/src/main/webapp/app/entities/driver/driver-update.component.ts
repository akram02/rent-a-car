import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDriver } from 'app/shared/model/driver.model';
import { DriverService } from './driver.service';
import { ICar } from 'app/shared/model/car.model';
import { CarService } from 'app/entities/car';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';
import { FleetOwnerService } from 'app/entities/fleet-owner';

@Component({
    selector: 'jhi-driver-update',
    templateUrl: './driver-update.component.html'
})
export class DriverUpdateComponent implements OnInit {
    private _driver: IDriver;
    isSaving: boolean;

    cars: ICar[];

    fleetowners: IFleetOwner[];
    createdAt: string;
    updatedAt: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private driverService: DriverService,
        private carService: CarService,
        private fleetOwnerService: FleetOwnerService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ driver }) => {
            this.driver = driver;
        });
        this.carService.query({ filter: 'driver-is-null' }).subscribe(
            (res: HttpResponse<ICar[]>) => {
                if (!this.driver.car || !this.driver.car.id) {
                    this.cars = res.body;
                } else {
                    this.carService.find(this.driver.car.id).subscribe(
                        (subRes: HttpResponse<ICar>) => {
                            this.cars = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
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
        this.dataUtils.clearInputImage(this.driver, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.driver.createdAt = moment(this.createdAt, DATE_TIME_FORMAT);
        this.driver.updatedAt = moment(this.updatedAt, DATE_TIME_FORMAT);
        if (this.driver.id !== undefined) {
            this.subscribeToSaveResponse(this.driverService.update(this.driver));
        } else {
            this.subscribeToSaveResponse(this.driverService.create(this.driver));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDriver>>) {
        result.subscribe((res: HttpResponse<IDriver>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCarById(index: number, item: ICar) {
        return item.id;
    }

    trackFleetOwnerById(index: number, item: IFleetOwner) {
        return item.id;
    }
    get driver() {
        return this._driver;
    }

    set driver(driver: IDriver) {
        this._driver = driver;
        this.createdAt = moment(driver.createdAt).format(DATE_TIME_FORMAT);
        this.updatedAt = moment(driver.updatedAt).format(DATE_TIME_FORMAT);
    }
}
