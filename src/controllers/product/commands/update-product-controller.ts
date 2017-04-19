import { ProductManager } from "./../../../services/product-manager/product-manager";
import { given } from "n-defensive";
import { Product } from "./../../../models/product";
import { httpPut, httpRoute, Controller, HttpException } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";
import { Validator, strval } from "n-validate";

@httpPut
@httpRoute(Routes.updateProduct)
@inject("ProductManager", "ConfigService")    
export class UpdateProductController extends Controller
{
    private readonly _productManager: ProductManager;
    private readonly _configService: ConfigService;


    public constructor(productManager: ProductManager, configService: ConfigService)
    {
        given(productManager, "productManager").ensureHasValue();
        given(configService, "configService").ensureHasValue();
        super();
        this._productManager = productManager;
        this._configService = configService;
    }
    
    public async execute(id: number, model: Model): Promise<any>
    {
        this.validateModel(model);

        let product = await this._productManager.updateProduct(id, model.name, model.price);
        let baseUrl = await this._configService.getBaseUrl();

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            links: {
                self: this.generateUrl(Routes.getProduct, { id: product.id }, baseUrl),
                update: this.generateUrl(Routes.updateProduct, { id: product.id }, baseUrl),
                delete: this.generateUrl(Routes.deleteProduct, { id: product.id }, baseUrl)
            }
        };
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();
        validator.for<string>("name").isRequired().useValidationRule(strval.hasMaxLength(100));
        validator.for<number>("price").isOptional();

        validator.validate(model);
        if (validator.hasErrors)
            throw new HttpException(400, validator.errors);
    }
}

interface Model
{
    name: string;
    price: number;
}