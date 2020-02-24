import {browser, by, element, Key, ElementFinder} from 'protractor';

export class TodoPage {

  navigateTo() {
    return browser.get('/todos');
  }

  getTodoTitle() {
    let title = element(by.className('todo-list-title')).getText();
    return title;
  }

  typeInput(inputId: string, text: string) {
    let input = element(by.id(inputId));
    input.click();
    input.sendKeys(text);
  }

  getTodoCards() {
    return element(by.className('todo-nav-list')).all(by.tagName('app-todo-card'));
  }
}
