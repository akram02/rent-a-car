/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { FleetOwnerDeleteDialogComponent } from 'app/entities/fleet-owner/fleet-owner-delete-dialog.component';
import { FleetOwnerService } from 'app/entities/fleet-owner/fleet-owner.service';

describe('Component Tests', () => {
    describe('FleetOwner Management Delete Component', () => {
        let comp: FleetOwnerDeleteDialogComponent;
        let fixture: ComponentFixture<FleetOwnerDeleteDialogComponent>;
        let service: FleetOwnerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FleetOwnerDeleteDialogComponent]
            })
                .overrideTemplate(FleetOwnerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FleetOwnerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FleetOwnerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
