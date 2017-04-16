import * as assert from "assert";
import { TodoManager } from "./../src/services/todo-manager/todo-manager";
import { InmemoryTodoManager } from "./../src/services/todo-manager/inmemory-todo-manager";
import { ConsoleLogger } from "./../src/services/logger/consoleLogger";

suite("TodoManager", () =>
{
    let todoManager: TodoManager;
    
    let throwsAsync = async (asyncBlock: () => Promise<any>) => 
    {
        try 
        {
            await asyncBlock();  
        }
        catch (error)
        {
            return Promise.resolve();
        }
        
        throw new assert.AssertionError({ message: "Missing expected exception.."});
    };
    
    setup(() =>
    {
        todoManager = new InmemoryTodoManager(new ConsoleLogger());
    });
    
    suite("getTodos", () =>
    {
        test("should return and empty Array of Todos", async () =>
        {
            let todos = await todoManager.getTodos();
            assert.ok(todos !== null);
            assert.ok(Array.isArray(todos));
            assert.strictEqual(todos.length, 0);
        });
    });
    
    suite("addTodo", () =>
    {
        test("should throw an exception when title is passed in as null", async () =>
        {
            await throwsAsync(async () => await todoManager.addTodo(null, "description"));
        });
        
        test("should throw an exception is title is passed in as empty string", async () =>
        {
            await throwsAsync(async () => await todoManager.addTodo("", "description"));
        });
        
        test("should throw an exception is title is passed in as whitespace string", async () =>
        {
            await throwsAsync(async () => await todoManager.addTodo(" ", "description"));
        });
        
        test("should create and return todo with correct title and no description when called with just title", async () =>
        {
            let todo = await todoManager.addTodo("test title", null);
            assert.ok(todo != null);
            assert.strictEqual(todo.title, "test title");
            assert.strictEqual(todo.description, null);
            let allTodos = await todoManager.getTodos();
            assert.strictEqual(allTodos.length, 1);
        });
        
        test("should create and return todo with correct title and description when called with title and description", async () =>
        {
            let todo = await todoManager.addTodo("test title", "test description");
            assert.ok(todo != null);
            assert.strictEqual(todo.title, "test title");
            assert.strictEqual(todo.description, "test description");
            let allTodos = await todoManager.getTodos();
            assert.strictEqual(allTodos.length, 1);
        });
    });
    
    suite("updateTodo", () =>
    {
        test("should throw an exception when id is passed in as null");
        test("should throw an exception when non-existant id is passed in");
        test("should throw an exception when title is passed in as null");
        test("should throw an exception when title is passed in as empty string");
        test("should throw an exception when title is passed in as whitespace string");
        test("should update and return todo with correct title and no description when called with just id and title");
        test("should update and return todo with correct title and description when called with id, title and description");
    });
    
    suite("deleteTodo", () =>
    {
        test("should throw an exception when id is passed in as null");
        test("should work fine without any changes when a non-existent id is passed in");
        test("should delete the todo when a valid id is passed in");
    });
});