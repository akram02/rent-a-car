import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarType } from 'app/shared/model/car-type.model';

@Component({
    selector: 'jhi-car-type-detail',
    templateUrl: './car-type-detail.component.html'
})
export class CarTypeDetailComponent implements OnInit {
    carType: ICarType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ carType }) => {
            this.carType = carType;
        });
    }

    previousState() {
        window.history.back();
    }
}
