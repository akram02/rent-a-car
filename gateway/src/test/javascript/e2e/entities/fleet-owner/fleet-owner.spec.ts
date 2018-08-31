import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FleetOwnerComponentsPage, FleetOwnerUpdatePage } from './fleet-owner.page-object';
import * as path from 'path';

describe('FleetOwner e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let fleetOwnerUpdatePage: FleetOwnerUpdatePage;
    let fleetOwnerComponentsPage: FleetOwnerComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FleetOwners', async () => {
        await navBarPage.goToEntity('fleet-owner');
        fleetOwnerComponentsPage = new FleetOwnerComponentsPage();
        expect(await fleetOwnerComponentsPage.getTitle()).toMatch(/gatewayApp.fleetOwner.home.title/);
    });

    it('should load create FleetOwner page', async () => {
        await fleetOwnerComponentsPage.clickOnCreateButton();
        fleetOwnerUpdatePage = new FleetOwnerUpdatePage();
        expect(await fleetOwnerUpdatePage.getPageTitle()).toMatch(/gatewayApp.fleetOwner.home.createOrEditLabel/);
        await fleetOwnerUpdatePage.cancel();
    });

    it('should create and save FleetOwners', async () => {
        await fleetOwnerComponentsPage.clickOnCreateButton();
        await fleetOwnerUpdatePage.setCompanyNameInput('companyName');
        expect(await fleetOwnerUpdatePage.getCompanyNameInput()).toMatch('companyName');
        await fleetOwnerUpdatePage.genderSelectLastOption();
        await fleetOwnerUpdatePage.setPhoneInput('phone');
        expect(await fleetOwnerUpdatePage.getPhoneInput()).toMatch('phone');
        await fleetOwnerUpdatePage.setAddressLine1Input('addressLine1');
        expect(await fleetOwnerUpdatePage.getAddressLine1Input()).toMatch('addressLine1');
        await fleetOwnerUpdatePage.setAddressLine2Input('addressLine2');
        expect(await fleetOwnerUpdatePage.getAddressLine2Input()).toMatch('addressLine2');
        await fleetOwnerUpdatePage.setCityInput('city');
        expect(await fleetOwnerUpdatePage.getCityInput()).toMatch('city');
        await fleetOwnerUpdatePage.setCountryInput('country');
        expect(await fleetOwnerUpdatePage.getCountryInput()).toMatch('country');
        await fleetOwnerUpdatePage.setImageInput(absolutePath);
        await fleetOwnerUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fleetOwnerUpdatePage.getCreatedAtInput()).toContain('2001-01-01T02:30');
        await fleetOwnerUpdatePage.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await fleetOwnerUpdatePage.getUpdatedAtInput()).toContain('2001-01-01T02:30');
        await fleetOwnerUpdatePage.userSelectLastOption();
        await fleetOwnerUpdatePage.save();
        expect(await fleetOwnerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
