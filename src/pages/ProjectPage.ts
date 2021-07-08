import config from "../data/config.json"
import {Page} from "playwright";
import {logger} from "../utils/logger/Config";

export class ProjectPage {
    constructor(page: Page) {
        this.page = page;
    }

    private page: Page;
    private newRepoHeader = 'xpath=//*[@id="content-body"]/h4'
    private settingsIcon = 'data-testid=settings-icon';
    private membersIcon = 'id=js-onboarding-members-link';
    private projectDeletionText = '#content-body > div.flash-container.flash-container-page.sticky > div > span'

    async projectSuccessMessage() {
        const actual = await this.page.$eval(this.newRepoHeader,
            element => element.textContent);
        return actual;
    }

    private async scrollDownToSettings() {
        logger.info('Scrolling down to setting icon')
        await this.page.waitForSelector(this.membersIcon)
        await this.page.$eval(this.settingsIcon, (element) => {
            element.scrollIntoView(false);
        });
    }

    async navigateToProjectEdit(projectName: String) {
        let url = `${config.projectUrl + projectName}/edit`;
        logger.info(`Navigating to ${url}`)
        await this.page.goto(url);
    }

    private async clickOnMembers() {
        logger.info(`Clicking on members to add them`)
        await this.page.waitForSelector(this.membersIcon);
        await this.page.click(this.membersIcon);
    }

    async selectCiCd(projectName: string) {
        let url = `${config.projectUrl + projectName}/-/settings/ci_cd`;
        logger.info(`Navigating to ${url}`)
        await this.page.goto(url);
    }

    async navigateToProjectMembers() {
        await this.scrollDownToSettings()
        await this.clickOnMembers()
    }
}