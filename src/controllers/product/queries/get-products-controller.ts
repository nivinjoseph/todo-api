import { Product } from "./../../../models/product";
import { given } from "n-defensive";
import { ProductManager } from "./../../../services/product-manager/product-manager";
import { httpGet, httpRoute, Controller } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";

@httpGet
@httpRoute(Routes.getProducts)
@inject("ProductManager", "ConfigService")    
export class GetProductsController extends Controller
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
    
    
    public async execute(): Promise<object>
    {
        let products = await this._productManager.getProducts();
        let baseUrl = await this._configService.getBaseUrl();
        
        return {
            items: products.map(product =>
            {
                return {
                    id: product.id,
                    name: product.name,
                    links: {
                        self: this.generateUrl(Routes.getProduct, { id: product.id }, baseUrl)
                    }
                };
            }),
            links: {
                create: this.generateUrl(Routes.createProduct, null, baseUrl)
            }
        };
    }
}