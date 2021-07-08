import {Page} from "playwright";
import {logger} from "../../utils/logger/Config";

export class NewProjectPage {
    private createBlankProject = '.experiment-new-project-page-blank-state'
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickBlankProject() {
        logger.info('Creating a new blank project')
        await this.page.click(this.createBlankProject);
    }
}
