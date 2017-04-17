import { ExceptionHandler } from "n-web";
import { Exception } from "n-exception";
import { TodoNotFoundException } from "./todo-not-found-exception";
import { HttpException } from "n-web";
import { inject } from "n-ject";
import { Logger } from "./../services/logger/logger";
import { given } from "n-defensive";

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
        await this._logger.logError(exp);
        
        if (exp instanceof TodoNotFoundException)
        {
            await this.handleTodoNotFoundException(exp as TodoNotFoundException);
        }    
        else
        {
            throw new HttpException(500, "We encountered a problem while processing your request");
        }    
    }
        
    private handleTodoNotFoundException(exp: TodoNotFoundException): Promise<any>
    {
        throw new HttpException(404, "todo not found");
    }
}