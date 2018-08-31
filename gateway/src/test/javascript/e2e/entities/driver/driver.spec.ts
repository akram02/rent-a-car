import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DriverComponentsPage, DriverUpdatePage } from './driver.page-object';
import * as path from 'path';

describe('Driver e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let driverUpdatePage: DriverUpdatePage;
    let driverComponentsPage: DriverComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Drivers', async () => {
        await navBarPage.goToEntity('driver');
        driverComponentsPage = new DriverComponentsPage();
        expect(await driverComponentsPage.getTitle()).toMatch(/gatewayApp.driver.home.title/);
    });

    it('should load create Driver page', async () => {
        await driverComponentsPage.clickOnCreateButton();
        driverUpdatePage = new DriverUpdatePage();
        expect(await driverUpdatePage.getPageTitle()).toMatch(/gatewayApp.driver.home.createOrEditLabel/);
        await driverUpdatePage.cancel();
    });

    it('should create and save Drivers', async () => {
        await driverComponentsPage.clickOnCreateButton();
        await driverUpdatePage.setFirstNameInput('firstName');
        expect(await driverUpdatePage.getFirstNameInput()).toMatch('firstName');
        await driverUpdatePage.setLastNameInput('lastName');
        expect(await driverUpdatePage.getLastNameInput()).toMatch('lastName');
        await driverUpdatePage.setEmailInput('email');
        expect(await driverUpdatePage.getEmailInput()).toMatch('email');
        await driverUpdatePage.genderSelectLastOption();
        await driverUpdatePage.setPhoneInput('phone');
        expect(await driverUpdatePage.getPhoneInput()).toMatch('phone');
        await driverUpdatePage.setAddressLine1Input('addressLine1');
        expect(await driverUpdatePage.getAddressLine1Input()).toMatch('addressLine1');
        await driverUpdatePage.setAddressLine2Input('addressLine2');
        expect(await driverUpdatePage.getAddressLine2Input()).toMatch('addressLine2');
        await driverUpdatePage.setCityInput('city');
        expect(await driverUpdatePage.getCityInput()).toMatch('city');
        await driverUpdatePage.setCountryInput('country');
        expect(await driverUpdatePage.getCountryInput()).toMatch('country');
        await driverUpdatePage.setLicenseNoInput('licenseNo');
        expect(await driverUpdatePage.getLicenseNoInput()).toMatch('licenseNo');
        await driverUpdatePage.setLicenseImageInput(absolutePath);
        await driverUpdatePage.setNidInput('nid');
        expect(await driverUpdatePage.getNidInput()).toMatch('nid');
        await driverUpdatePage.setNidImageInput(absolutePath);
        await driverUpdatePage.setImageInput(absolutePath);
        await driverUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await driverUpdatePage.getCreatedAtInput()).toContain('2001-01-01T02:30');
        await driverUpdatePage.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await driverUpdatePage.getUpdatedAtInput()).toContain('2001-01-01T02:30');
        await driverUpdatePage.carSelectLastOption();
        await driverUpdatePage.fleetownerSelectLastOption();
        await driverUpdatePage.save();
        expect(await driverUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
