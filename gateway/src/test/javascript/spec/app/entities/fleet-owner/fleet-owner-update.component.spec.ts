/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { FleetOwnerUpdateComponent } from 'app/entities/fleet-owner/fleet-owner-update.component';
import { FleetOwnerService } from 'app/entities/fleet-owner/fleet-owner.service';
import { FleetOwner } from 'app/shared/model/fleet-owner.model';

describe('Component Tests', () => {
    describe('FleetOwner Management Update Component', () => {
        let comp: FleetOwnerUpdateComponent;
        let fixture: ComponentFixture<FleetOwnerUpdateComponent>;
        let service: FleetOwnerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FleetOwnerUpdateComponent]
            })
                .overrideTemplate(FleetOwnerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FleetOwnerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FleetOwnerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FleetOwner(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fleetOwner = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FleetOwner();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fleetOwner = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
