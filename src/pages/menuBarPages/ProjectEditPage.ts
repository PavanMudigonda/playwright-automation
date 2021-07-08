import {Page} from 'playwright';
import {logger} from "../../utils/logger/Config";

export class ProjectEditPage {

    private page: Page
    private advancedSettings = 'id=js-project-advanced-settings';
    private deleteProjectButton = 'xpath=//*[@id="js-project-advanced-settings"]/div[2]/div[6]/form/button';
    private confirmProjectNameInput = 'input#confirm_name_input.gl-form-input.form-control';
    private confirmDeleteButton = '#delete-project-modal-1___BV_modal_footer_ > button.btn.js-modal-action-primary.btn-danger.btn-md.gl-button > span'
    private projectText = '#delete-project-modal-1___BV_modal_body_ > div > p:nth-child(4) > code';

    constructor(page: Page) {
        this.page = page;
    }

    private async clickAdvancedSettings() {
        logger.info('Scrolling down to advanced settings and expanding them.')
        await this.page.waitForTimeout(1000);
        await this.page.$eval(this.advancedSettings, (element) => {
            element.scrollIntoView(false);
        });
        await this.page.click(this.advancedSettings);
    }

    private async clickDeleteProject() {
        logger.info('Scrolling down to delete project section.')
        await this.page.waitForTimeout(1000);
        await this.page.$eval(this.deleteProjectButton, (element) => {
            element.scrollIntoView(false);
        });
        logger.info('Deleting the project.')
        await this.page.click(this.deleteProjectButton);
    }

    private async confirmDeleteProject() {
        logger.info('Confirming the delete project!')
        let projectName = await this.page.innerText(this.projectText);
        await this.page.waitForTimeout(1000);
        await this.page.type(this.confirmProjectNameInput, projectName);
        await this.page.click(this.confirmDeleteButton);
    }

    public async deleteProject() {
        await this.clickAdvancedSettings()
        await this.clickDeleteProject()
        await this.confirmDeleteProject()
    }
}