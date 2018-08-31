import { element, by, ElementFinder } from 'protractor';

export class CarComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-car div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CarUpdatePage {
    pageTitle = element(by.id('jhi-car-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    brandInput = element(by.id('field_brand'));
    modelInput = element(by.id('field_model'));
    registrationNoInput = element(by.id('field_registrationNo'));
    imageInput = element(by.id('file_image'));
    manufacturerYearInput = element(by.id('field_manufacturerYear'));
    driverIdInput = element(by.id('field_driverId'));
    createdAtInput = element(by.id('field_createdAt'));
    updatedAtInput = element(by.id('field_updatedAt'));
    cartypeSelect = element(by.id('field_cartype'));
    fleetownerSelect = element(by.id('field_fleetowner'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setBrandInput(brand) {
        await this.brandInput.sendKeys(brand);
    }

    async getBrandInput() {
        return this.brandInput.getAttribute('value');
    }

    async setModelInput(model) {
        await this.modelInput.sendKeys(model);
    }

    async getModelInput() {
        return this.modelInput.getAttribute('value');
    }

    async setRegistrationNoInput(registrationNo) {
        await this.registrationNoInput.sendKeys(registrationNo);
    }

    async getRegistrationNoInput() {
        return this.registrationNoInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async setManufacturerYearInput(manufacturerYear) {
        await this.manufacturerYearInput.sendKeys(manufacturerYear);
    }

    async getManufacturerYearInput() {
        return this.manufacturerYearInput.getAttribute('value');
    }

    async setDriverIdInput(driverId) {
        await this.driverIdInput.sendKeys(driverId);
    }

    async getDriverIdInput() {
        return this.driverIdInput.getAttribute('value');
    }

    async setCreatedAtInput(createdAt) {
        await this.createdAtInput.sendKeys(createdAt);
    }

    async getCreatedAtInput() {
        return this.createdAtInput.getAttribute('value');
    }

    async setUpdatedAtInput(updatedAt) {
        await this.updatedAtInput.sendKeys(updatedAt);
    }

    async getUpdatedAtInput() {
        return this.updatedAtInput.getAttribute('value');
    }

    async cartypeSelectLastOption() {
        await this.cartypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async cartypeSelectOption(option) {
        await this.cartypeSelect.sendKeys(option);
    }

    getCartypeSelect(): ElementFinder {
        return this.cartypeSelect;
    }

    async getCartypeSelectedOption() {
        return this.cartypeSelect.element(by.css('option:checked')).getText();
    }

    async fleetownerSelectLastOption() {
        await this.fleetownerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async fleetownerSelectOption(option) {
        await this.fleetownerSelect.sendKeys(option);
    }

    getFleetownerSelect(): ElementFinder {
        return this.fleetownerSelect;
    }

    async getFleetownerSelectedOption() {
        return this.fleetownerSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
