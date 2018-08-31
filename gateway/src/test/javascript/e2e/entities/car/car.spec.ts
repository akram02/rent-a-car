import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CarComponentsPage, CarUpdatePage } from './car.page-object';
import * as path from 'path';

describe('Car e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let carUpdatePage: CarUpdatePage;
    let carComponentsPage: CarComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Cars', async () => {
        await navBarPage.goToEntity('car');
        carComponentsPage = new CarComponentsPage();
        expect(await carComponentsPage.getTitle()).toMatch(/gatewayApp.car.home.title/);
    });

    it('should load create Car page', async () => {
        await carComponentsPage.clickOnCreateButton();
        carUpdatePage = new CarUpdatePage();
        expect(await carUpdatePage.getPageTitle()).toMatch(/gatewayApp.car.home.createOrEditLabel/);
        await carUpdatePage.cancel();
    });

    it('should create and save Cars', async () => {
        await carComponentsPage.clickOnCreateButton();
        await carUpdatePage.setBrandInput('brand');
        expect(await carUpdatePage.getBrandInput()).toMatch('brand');
        await carUpdatePage.setModelInput('model');
        expect(await carUpdatePage.getModelInput()).toMatch('model');
        await carUpdatePage.setRegistrationNoInput('registrationNo');
        expect(await carUpdatePage.getRegistrationNoInput()).toMatch('registrationNo');
        await carUpdatePage.setImageInput(absolutePath);
        await carUpdatePage.setManufacturerYearInput('5');
        expect(await carUpdatePage.getManufacturerYearInput()).toMatch('5');
        await carUpdatePage.setDriverIdInput('5');
        expect(await carUpdatePage.getDriverIdInput()).toMatch('5');
        await carUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await carUpdatePage.getCreatedAtInput()).toContain('2001-01-01T02:30');
        await carUpdatePage.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await carUpdatePage.getUpdatedAtInput()).toContain('2001-01-01T02:30');
        await carUpdatePage.cartypeSelectLastOption();
        await carUpdatePage.fleetownerSelectLastOption();
        await carUpdatePage.save();
        expect(await carUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
