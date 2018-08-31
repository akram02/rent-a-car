import { element, by, ElementFinder } from 'protractor';

export class DriverComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-driver div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DriverUpdatePage {
    pageTitle = element(by.id('jhi-driver-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    emailInput = element(by.id('field_email'));
    genderSelect = element(by.id('field_gender'));
    phoneInput = element(by.id('field_phone'));
    addressLine1Input = element(by.id('field_addressLine1'));
    addressLine2Input = element(by.id('field_addressLine2'));
    cityInput = element(by.id('field_city'));
    countryInput = element(by.id('field_country'));
    licenseNoInput = element(by.id('field_licenseNo'));
    licenseImageInput = element(by.id('file_licenseImage'));
    nidInput = element(by.id('field_nid'));
    nidImageInput = element(by.id('file_nidImage'));
    imageInput = element(by.id('file_image'));
    createdAtInput = element(by.id('field_createdAt'));
    updatedAtInput = element(by.id('field_updatedAt'));
    carSelect = element(by.id('field_car'));
    fleetownerSelect = element(by.id('field_fleetowner'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setGenderSelect(gender) {
        await this.genderSelect.sendKeys(gender);
    }

    async getGenderSelect() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    }

    async genderSelectLastOption() {
        await this.genderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    async setAddressLine1Input(addressLine1) {
        await this.addressLine1Input.sendKeys(addressLine1);
    }

    async getAddressLine1Input() {
        return this.addressLine1Input.getAttribute('value');
    }

    async setAddressLine2Input(addressLine2) {
        await this.addressLine2Input.sendKeys(addressLine2);
    }

    async getAddressLine2Input() {
        return this.addressLine2Input.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setCountryInput(country) {
        await this.countryInput.sendKeys(country);
    }

    async getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    async setLicenseNoInput(licenseNo) {
        await this.licenseNoInput.sendKeys(licenseNo);
    }

    async getLicenseNoInput() {
        return this.licenseNoInput.getAttribute('value');
    }

    async setLicenseImageInput(licenseImage) {
        await this.licenseImageInput.sendKeys(licenseImage);
    }

    async getLicenseImageInput() {
        return this.licenseImageInput.getAttribute('value');
    }

    async setNidInput(nid) {
        await this.nidInput.sendKeys(nid);
    }

    async getNidInput() {
        return this.nidInput.getAttribute('value');
    }

    async setNidImageInput(nidImage) {
        await this.nidImageInput.sendKeys(nidImage);
    }

    async getNidImageInput() {
        return this.nidImageInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
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

    async carSelectLastOption() {
        await this.carSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async carSelectOption(option) {
        await this.carSelect.sendKeys(option);
    }

    getCarSelect(): ElementFinder {
        return this.carSelect;
    }

    async getCarSelectedOption() {
        return this.carSelect.element(by.css('option:checked')).getText();
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
