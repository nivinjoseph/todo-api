import { ExceptionHandler } from "n-web";
import { Exception } from "n-exception";
import { TodoNotFoundException } from "./todo-not-found-exception";
import { HttpException } from "n-web";

export class AppExceptionHandler extends ExceptionHandler
{
    public async handle(exp: Exception): Promise<any>
    {
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