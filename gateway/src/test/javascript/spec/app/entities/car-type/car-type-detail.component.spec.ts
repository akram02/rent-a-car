/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { CarTypeDetailComponent } from 'app/entities/car-type/car-type-detail.component';
import { CarType } from 'app/shared/model/car-type.model';

describe('Component Tests', () => {
    describe('CarType Management Detail Component', () => {
        let comp: CarTypeDetailComponent;
        let fixture: ComponentFixture<CarTypeDetailComponent>;
        const route = ({ data: of({ carType: new CarType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CarTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CarTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CarTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.carType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
