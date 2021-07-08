import data from '../src/data/config.json';
import {HomePage} from '../src/pages/HomePage';
import {NewProjectPage} from '../src/pages/projectCreationPages/NewPojectPage';
import {BlankProjectPage} from '../src/pages/projectCreationPages/BlankProjectPage';
import {ProjectPage} from "../src/pages/ProjectPage";
import {ProjectEditPage} from "../src/pages/menuBarPages/ProjectEditPage";
import {Utils} from "../src/utils/utils";
import { folio } from './fixtures';
const { it , describe,beforeEach } = folio;

describe('Gitlab core tests', () => {

    beforeEach(async ({page}) => {
        await page.goto(data.homePageUrl);
    })

    let projectName = new Utils().getRandomName();
    it('An existing user should be able to create and delete a project', async ({page}) => {
        let blankProjectPage = new BlankProjectPage(page);
        let newProjectPage = new NewProjectPage(page);
        let homePage = new HomePage(page);
        
        await homePage.createNewProject();
        await newProjectPage.clickBlankProject();
        await blankProjectPage.createProject(projectName);

        let projectEditPage = new ProjectEditPage(page);
        let projectPage = new ProjectPage(page);
        await projectPage.navigateToProjectEdit(projectName);
        await projectEditPage.deleteProject();
    })
})

