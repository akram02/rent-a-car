import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CarTypeComponentsPage, CarTypeUpdatePage } from './car-type.page-object';

describe('CarType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let carTypeUpdatePage: CarTypeUpdatePage;
    let carTypeComponentsPage: CarTypeComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CarTypes', async () => {
        await navBarPage.goToEntity('car-type');
        carTypeComponentsPage = new CarTypeComponentsPage();
        expect(await carTypeComponentsPage.getTitle()).toMatch(/gatewayApp.carType.home.title/);
    });

    it('should load create CarType page', async () => {
        await carTypeComponentsPage.clickOnCreateButton();
        carTypeUpdatePage = new CarTypeUpdatePage();
        expect(await carTypeUpdatePage.getPageTitle()).toMatch(/gatewayApp.carType.home.createOrEditLabel/);
        await carTypeUpdatePage.cancel();
    });

    it('should create and save CarTypes', async () => {
        await carTypeComponentsPage.clickOnCreateButton();
        await carTypeUpdatePage.setTypeNameInput('typeName');
        expect(await carTypeUpdatePage.getTypeNameInput()).toMatch('typeName');
        await carTypeUpdatePage.save();
        expect(await carTypeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
