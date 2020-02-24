import {TodoPage} from './todo-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something in the limit filter and check that it returned correct number of elements', () => {
    page.typeInput('todo-limit-input', '1');

    expect(page.getTodoCards().count()).toBe(1);
  });

  it('should type something in the orderBy field and check that it returned in the correct order', () => {
    page.selectMatSelectValue('todo-orderBy-input', 'owner');

    expect(page.getTodoCards().get(0).element(by.className('todo-list-owner')).getText()).toBe('Barry');
  })
});
