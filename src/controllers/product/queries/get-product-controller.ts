import { given } from "n-defensive";
import { ProductManager } from "./../../../services/product-manager/product-manager";
import { httpGet, httpRoute, Controller } from "n-web";
import * as Routes from "./../../routes";
import { ProductNotFoundException } from "./../../../exceptions/product-not-found-exception";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";

@httpGet
@httpRoute(Routes.getProduct)    
@inject("ProductManager", "ConfigService")    
export class GetProductController extends Controller
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
    
    public async execute(id: number): Promise<any>
    {
        let products = await this._productManager.getProducts();
        let product = products.find(p => p.id === id);
        if (product == null)
            throw new ProductNotFoundException(id);
        
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
}