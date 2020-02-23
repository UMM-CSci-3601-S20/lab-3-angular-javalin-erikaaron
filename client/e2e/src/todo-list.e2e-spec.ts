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

  it('Should type something in the limit filter and check that it returned correct number of elements', () => {
    page.typeInput('todo-limit-input', '7');

    expect(page.getTodoCards().getSize).toBe(7);
  });
});
