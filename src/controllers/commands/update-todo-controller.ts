import { TodoManager } from "./../../services/todo-manager/todo-manager";
import { given } from "n-defensive";
import { Todo } from "./../../models/todo";
import { httpPut, httpRoute, Controller } from "n-web";
import * as Routes from "./../routes";
import { ConfigService } from "./../../services/config-service/config-service";
import { inject } from "n-ject";

@httpPut
@httpRoute(Routes.updateTodo) 
@inject("TodoManager", "ConfigService")    
export class UpdateTodoController extends Controller
{
    private readonly _todoManager: TodoManager;
    private readonly _configService: ConfigService;
    
    
    public constructor(todoManager: TodoManager, configService: ConfigService)
    {
        given(todoManager, "todoManager").ensureHasValue();
        given(configService, "configService").ensureHasValue();
        super();
        this._todoManager = todoManager;
        this._configService = configService;
    }
    
    
    public async execute(id: number, model: Model): Promise<any>
    {
        let todo = await this._todoManager.updateTodo(id, model.title, model.description);
        
        let baseUrl = await this._configService.getBaseUrl();
        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            links: {
                self: this.generateUrl(Routes.getTodo, { id: todo.id }, baseUrl),
                update: this.generateUrl(Routes.updateTodo, { id: todo.id }, baseUrl),
                delete: this.generateUrl(Routes.deleteTodo, { id: todo.id }, baseUrl)
            }
        };
    }
}

interface Model
{
    title: string;
    description: string;
}