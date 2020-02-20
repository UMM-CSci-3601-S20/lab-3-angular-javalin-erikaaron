import {browser, by, element, Key, ElementFinder} from 'protractor';

export class TodoPage {

  navigateTo() {
    return browser.get('/todos');
  }

  getTodoTitle() {
    let title = element(by.className('todo-list-title')).getText();
    return title;
  }
}
