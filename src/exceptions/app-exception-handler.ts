import { ExceptionHandler } from "n-web";
import { Exception } from "n-exception";
import { TodoNotFoundException } from "./todo-not-found-exception";
import { CategoryNotFoundException } from "./category-not-found-exception";
import { HttpException } from "n-web";
import { inject } from "n-ject";
import { Logger } from "./../services/logger/logger";
import { given } from "n-defensive";
import "n-ext";

@inject("Logger")
export class AppExceptionHandler extends ExceptionHandler
{
    private readonly _logger: Logger;
    
    
    public constructor(logger: Logger)
    {
        given(logger, "logger").ensureHasValue();
        super();
        this._logger = logger;
    }
    
    
    public async handle(exp: Exception): Promise<any>
    {
        let typeName = (<Object>exp).getTypeName();
        let handlerName = "handle{0}".format(typeName);
        if (this[handlerName] !== undefined)
        { 
            return await this[handlerName](exp);
        }
        else
        {
            await this._logger.logError(exp);
            throw new HttpException(500, "We encountered a problem while processing your request");
        }
    }
        
    private handleTodoNotFoundException(exp: TodoNotFoundException): Promise<any>
    {
        throw new HttpException(404, "todo not found");
    }
    
    private handleCategoryNotFoundException(exp: CategoryNotFoundException): Promise<any>
    {
        throw new HttpException(404, "category not found");
    }
}