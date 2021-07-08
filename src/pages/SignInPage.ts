import {Page} from "playwright";
import {logger} from "../utils/logger/Config";

export class SignInPage {
    constructor(page: Page) {
        this.page = page;
    }

    private page: Page;
    private userName = 'id=user_login';
    private password = 'id=user_password';

    async signIn(userName: any, password: any) {
        await this.page.waitForSelector(this.userName);
        await this.page.type(this.userName, userName);
        logger.info(`Entering userName as ${userName}`)
        await this.page.type(this.password, password)
        logger.info(`Entering password as ${password}`)
        await this.page.keyboard.press('Enter')
        logger.info(`SignIn into the Gitlab`)

    }
}
