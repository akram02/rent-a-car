import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICarType } from 'app/shared/model/car-type.model';
import { CarTypeService } from './car-type.service';

@Component({
    selector: 'jhi-car-type-update',
    templateUrl: './car-type-update.component.html'
})
export class CarTypeUpdateComponent implements OnInit {
    private _carType: ICarType;
    isSaving: boolean;

    constructor(private carTypeService: CarTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ carType }) => {
            this.carType = carType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.carType.id !== undefined) {
            this.subscribeToSaveResponse(this.carTypeService.update(this.carType));
        } else {
            this.subscribeToSaveResponse(this.carTypeService.create(this.carType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICarType>>) {
        result.subscribe((res: HttpResponse<ICarType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get carType() {
        return this._carType;
    }

    set carType(carType: ICarType) {
        this._carType = carType;
    }
}
