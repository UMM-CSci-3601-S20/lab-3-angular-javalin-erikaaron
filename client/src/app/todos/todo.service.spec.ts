import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Todo service: ', () => {
  // A small collection of test todos
  const testTodos: Todo[] = [
    {
      _id: 'blanche_id',
      owner: 'blanche',
      status: false,
      body: 'Turn it off',
      category: 'video games'
    },
    {
      _id: 'rose_id',
      owner: 'rose',
      status: true,
      body: 'Like a light switch',
      category: 'groceries'
    },
    {
      _id: 'dorothy_id',
      owner: 'dorothy',
      status: false,
      body: 'Just go *click*',
      category: 'software design'
    },
    {
      _id: 'sofia_id',
      owner: 'sofia',
      status: true,
      // tslint:disable-next-line: quotemark
      body: "It's a cool little mormon trick",
      category: 'homework'
    }
  ];
  let todoService: TodoService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getTodos() calls api/todos', () => {
    // Assert that the todos we get from this call to gettodos()
    // should be our set of test todos. Because we're subscribing
    // to the result of gettodos(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testtodos) a few lines
    // down.
    todoService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  it('getTodos() calls api/todos with filter parameter \'blanche\'', () => {

    todoService.getTodos({ owner: 'blanche' }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL with the owner parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the status parameter was 'true'
    expect(req.request.params.get('owner')).toEqual('blanche');

    req.flush(testTodos);
  });

  it('gettodos() calls api/todos with filter parameter \'body\'', () => {

    // tslint:disable-next-line: quotemark
    todoService.getTodos({ body: "It's a cool little mormon trick" }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('body')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameter was 'admin'
    // tslint:disable-next-line: quotemark
    expect(req.request.params.get('body')).toEqual("It's a cool little mormon trick");

    req.flush(testTodos);
  });

  it('getTodos() calls api/todos with multiple filter parameters', () => {

    todoService.getTodos({ owner: 'rose', status: true, body: 'Like a light switch' }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL with the parameters.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl)
        && request.params.has('owner') && request.params.has('status') && request.params.has('body')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the parameters are correct
    expect(req.request.params.get('owner')).toEqual('rose');
    expect(req.request.params.get('status')).toBeTruthy();
    expect(req.request.params.get('body')).toEqual('Like a light switch');

    req.flush(testTodos);
  });

  it('getTodoById() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo._id;
    todoService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );

    const expectedUrl: string = todoService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });

  it('filterTodos() filters by owner', () => {
    expect(testTodos.length).toBe(3);
    const todoOwner = 'a';
    expect(todoService.filterTodos(testTodos, { owner: todoOwner }).length).toBe(2);
  });

  it('filterTodos() filters by category', () => {
    expect(testTodos.length).toBe(3);
    const todoCategory = 'UMM';
    expect(todoService.filterTodos(testTodos, { category: todoCategory }).length).toBe(1);
  });

  it('filtertodos() filters by owner and category', () => {
    expect(testTodos.length).toBe(3);
    const todoCategory = 'UMM';
    const todoOwner = 'chris';
    expect(todoService.filterTodos(testTodos, { owner: todoOwner, category: todoCategory }).length).toBe(1);
  });
});

