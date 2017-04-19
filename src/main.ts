import { AppInstaller } from "./ioc/app-installer";
import { WebApp } from "n-web";
import { GetTodosController } from "./controllers/todo/queries/get-todos-controller";
import { GetTodoController } from "./controllers/todo/queries/get-todo-controller";
import { CreateTodoController } from "./controllers/todo/commands/create-todo-controller";
import { UpdateTodoController } from "./controllers/todo/commands/update-todo-controller";
import { DeleteTodoController } from "./controllers/todo/commands/delete-todo-controller";
import { GetProductsController } from "./controllers/product/queries/get-products-controller";
import { GetProductController } from "./controllers/product/queries/get-product-controller";
import { CreateProductController } from "./controllers/product/commands/create-product-controller";
import { UpdateProductController } from "./controllers/product/commands/update-product-controller";
import { DeleteProductController } from "./controllers/product/commands/delete-product-controller";
import { AppExceptionHandler } from "./exceptions/app-exception-handler";

const app = new WebApp(3000)
    .enableCors()
    .registerInstaller(new AppInstaller())
    .registerControllers(
    GetTodosController,
    GetTodoController,
    CreateTodoController,
    UpdateTodoController,
    DeleteTodoController,
    GetProductsController,
    GetProductController,
    CreateProductController,
    UpdateProductController,
    DeleteProductController
    )
    .registerExceptionHandler(AppExceptionHandler);

app.bootstrap();

