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
  });

  it('should select something in the status field and check that it returned the correct status', () => {
    page.selectMatSelectValue('todo-status-input', 'complete');

    expect(page.getTodoCards().get(0).element(by.className('todo-list-status-true')).getText()).toBe('Complete');
  });


  it('should type something in the owner field and check that it returned the correct owner', () => {
    page.typeInput('todo-owner-input', 'workman');

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-list-owner')).getText()).toEqual('Workman');
    });
  });

  it('should type something in the category field and check that it returned the correct category', () => {
    page.typeInput('todo-category-input', 'groceries');

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-list-category')).getText()).toEqual('groceries');
    } );
  });

  it('should type something in the body field and check that it return the correct body', () => {
    page.typeInput('todo-contains-input',
    'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.');

    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-list-body')).getText()).toEqual
      ('In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.');
    });
  });

  it('should type values into multiple fields and check that it returned the correct element', () => {
    page.selectMatSelectValue('todo-status-input', 'complete');
    page.selectMatSelectValue('todo-orderBy-input', 'body');
    page.typeInput('todo-category-input', 'groceries');
    page.typeInput('todo-owner-input', 'workman');

    expect(page.getTodoCards().get(0).element(by.className('todo-list-body')).getText()).toBe(
      'Aliqua consectetur eu do culpa sint elit et Lorem occaecat. Esse reprehenderit nulla mollit dolor cupidatat eu dolor et deserunt sunt.'
    );
  })

});
