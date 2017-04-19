import { TodoManager } from "./../../../services/todo-manager/todo-manager";
import { given } from "n-defensive";
import { httpDelete, httpRoute, Controller } from "n-web";
import * as Routes from "./../../routes";
import { inject } from "n-ject";

@httpDelete
@httpRoute(Routes.deleteTodo)   
@inject("TodoManager")    
export class DeleteTodoController extends Controller
{
    private readonly _todoManager: TodoManager;
    
    
    public constructor(todoManager: TodoManager)
    {
        given(todoManager, "todoManager").ensureHasValue();
        super();
        this._todoManager = todoManager;
    }
    
    
    public execute(id: number): Promise<void>
    {
        return this._todoManager.deleteTodo(id);
    }
}

