import { ComponentInstaller, Registry } from "n-ject";
import { InmemoryTodoManager } from "./../services/todo-manager/inmemory-todo-manager";
import { DefaultConfigService } from "./../services/config-service/default-config-service";
import { ConsoleLogger } from "./../services/logger/consoleLogger";

export class AppInstaller implements ComponentInstaller
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