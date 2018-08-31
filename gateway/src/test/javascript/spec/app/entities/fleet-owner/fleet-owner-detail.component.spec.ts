/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { FleetOwnerDetailComponent } from 'app/entities/fleet-owner/fleet-owner-detail.component';
import { FleetOwner } from 'app/shared/model/fleet-owner.model';

describe('Component Tests', () => {
    describe('FleetOwner Management Detail Component', () => {
        let comp: FleetOwnerDetailComponent;
        let fixture: ComponentFixture<FleetOwnerDetailComponent>;
        const route = ({ data: of({ fleetOwner: new FleetOwner(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FleetOwnerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FleetOwnerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FleetOwnerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fleetOwner).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
