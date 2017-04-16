import { AppInstaller } from "./ioc/app-installer";
import { WebApp } from "n-web";
import { GetTodosController } from "./controllers/queries/get-todos-controller";
import { GetTodoController } from "./controllers/queries/get-todo-controller";
import { CreateTodoController } from "./controllers/commands/create-todo-controller";
import { UpdateTodoController } from "./controllers/commands/update-todo-controller";
import { DeleteTodoController } from "./controllers/commands/delete-todo-controller";
import { AppExceptionLogger } from "./exceptions/app-exception-logger";
import { AppExceptionHandler } from "./exceptions/app-exception-handler";

const app = new WebApp(3000)
    .enableCors()
    .registerInstaller(new AppInstaller())
    .registerControllers(GetTodosController, GetTodoController, CreateTodoController,
    UpdateTodoController, DeleteTodoController)
    .registerExceptionLogger(AppExceptionLogger)
    .registerExceptionHandler(AppExceptionHandler);

app.bootstrap();

