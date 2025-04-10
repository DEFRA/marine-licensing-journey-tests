import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';

Given('a web browser is on the Project Name page', function () {
    //create a user?
    //launch the app and navigate to the correct page
    this.today = 'Sunday';
});

When('the user inputs a valid project name and clicks save and continue', function () {
    this.projectName = 'My First Project';
});

Then('the new notification is created'), function () {
    // will I call a read API to check Mongo DB
    // ultimately this would also check dataverse
}