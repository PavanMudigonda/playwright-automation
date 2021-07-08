import {Page} from "playwright";
import {logger} from "../utils/logger/Config";

export class HomePage {
    constructor(page: Page) {
        this.page = page;
    }

    private page: Page;
    private existingProjectName = '.project-name'
    private newProject = "a.gl-button.btn.btn-success"

    async createNewProject() {
        logger.info("Creating a new project")
        await this.page.click(this.newProject)
    }

    async selectAnExistingProject() {
        logger.info("Selecting an existing project")
        await this.page.click(this.existingProjectName)
    }
}
