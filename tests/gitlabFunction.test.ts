import {HomePage} from '../src/pages/HomePage';
import {MembersPage} from "../src/pages/menuBarPages/MembersPage";
import {ProjectPage} from "../src/pages/ProjectPage";
import {PipelinePage} from "../src/pages/menuBarPages/PipelinePage";
import {Utils} from "../src/utils/utils";
import data from "../src/data/config.json";
import { folio } from './fixtures';
const { it , expect, describe, beforeEach } = folio;

describe('Gitlab tests', () => {
 
    beforeEach(async ({page}) => {
        await page.goto(data.homePageUrl);
    })

    it("User should be able add member to an existing project", async ({page}) => {
        let homePage = new HomePage(page);
        let projectPage = new ProjectPage(page);
        let memberPage = new MembersPage(page);

        await homePage.selectAnExistingProject()
        await projectPage.navigateToProjectMembers()
        await memberPage.addProjectMember(new Utils().getRandomEmailId())
        let messageForInvitingUser = await memberPage.getMessageForInviting();
        expect(messageForInvitingUser).toBe("Users were successfully added.");
    })

    it("User should be able to add a new variable to an existing project", async ({page}) => {
        let pipelinePage = new PipelinePage(page);
        let projectPage = new ProjectPage(page);
        let homePage = new HomePage(page);
        
        await homePage.selectAnExistingProject()

        await projectPage.selectCiCd("0586d1");
        let key = "env";
        let value = 'integration';
        await pipelinePage.addVariable(key, value);
        let addedVariableKey = await pipelinePage.getVariable();
        expect(addedVariableKey).toBe(key);

        await pipelinePage.deleteVariable();
        let noVariablesText = await pipelinePage.getNoVariablesText();
        expect(noVariablesText).toBe('There are no variables yet.');
    })
})
