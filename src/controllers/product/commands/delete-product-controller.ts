import { ProductManager } from "./../../../services/product-manager/product-manager";
import { given } from "n-defensive";
import { httpDelete, httpRoute, Controller } from "n-web";
import * as Routes from "./../../routes";
import { inject } from "n-ject";

@httpDelete
@httpRoute(Routes.deleteProduct)
@inject("ProductManager")
export class DeleteProductController extends Controller
{
    private readonly _productManager: ProductManager;


    public constructor(productManager: ProductManager)
    {
        given(productManager, "productManager").ensureHasValue();
        super();
        this._productManager = productManager;
    }


    public async execute(id: number): Promise<void>
    {
        return await this._productManager.deleteProduct(id);
    }
}