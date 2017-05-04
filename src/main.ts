import { ComponentInstaller, Registry } from "n-ject";
import { InmemoryTodoManager } from "./services/todo-manager/inmemory-todo-manager";
import { DefaultConfigService } from "./services/config-service/default-config-service";
import { ConsoleLogger } from "./services/logger/consoleLogger";
import { WebApp } from "n-web";
import { GetTodosController } from "./controllers/queries/get-todos-controller";
import { GetTodoController } from "./controllers/queries/get-todo-controller";
import { CreateTodoController } from "./controllers/commands/create-todo-controller";
import { UpdateTodoController } from "./controllers/commands/update-todo-controller";
import { DeleteTodoController } from "./controllers/commands/delete-todo-controller";
import { AppExceptionHandler } from "./exceptions/app-exception-handler";
import { ConfigurationManager } from "n-config";


class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        registry
            .registerSingleton("TodoManager", InmemoryTodoManager)
            .registerSingleton("ConfigService", DefaultConfigService)
            .registerSingleton("Logger", ConsoleLogger);
        ;
    }
}


const controllers = [GetTodosController, GetTodoController, CreateTodoController, UpdateTodoController, DeleteTodoController];

const app = new WebApp(ConfigurationManager.getConfig<number>("port"))
    .enableCors()
    .useInstaller(new Installer())
    .registerControllers(...controllers)
    .registerExceptionHandler(AppExceptionHandler);

app.bootstrap();

