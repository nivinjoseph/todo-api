import { ProductManager } from "./../../../services/product-manager/product-manager";
import { given } from "n-defensive";
import { httpPost, httpRoute, Controller, HttpException } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";
import { Validator, strval } from "n-validate";


@httpPost
@httpRoute(Routes.createProduct)
@inject("ProductManager", "ConfigService")
export class CreateProductController extends Controller
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

    // public async execute(model: Model): Promise<any>
    // {
    //     this.validateModel(model);

    //     let product = await this._productManager.addProduct(model.name, model.price);
    //     let baseUrl = await this._configService.getBaseUrl();

    //     return {
    //         id: product.id,
    //         name: product.name,
    //         price: product.price,
    //         links: {
    //             self: this.generateUrl(Routes.getProduct, { id: product.id }, baseUrl),
    //             update: this.generateUrl(Routes.updateProduct, { id: product.id }, baseUrl),
    //             delete: this.generateUrl(Routes.deleteProduct, { id: product.id }, baseUrl)
    //         }
    //     };
    // }

    // public execute(model: Model): Promise<any>
    // {
    //     this.validateModel(model);

    //     return this._productManager.addProduct(model.name, model.price)
    //         .then(product =>
    //         {
    //             return this._configService.getBaseUrl()
    //                 .then(baseUrl =>
    //                 {
    //                     return {
    //                         id: product.id,
    //                         name: product.name,
    //                         price: product.price,
    //                         links: {
    //                             self: this.generateUrl(Routes.getProduct, { id: product.id }, baseUrl),
    //                             update: this.generateUrl(Routes.updateProduct, { id: product.id }, baseUrl),
    //                             delete: this.generateUrl(Routes.deleteProduct, { id: product.id }, baseUrl)
    //                         }
    //                     };
    //                 });
    //         });
    // }
    
    public execute(model: Model): Promise<any>
    {
        this.validateModel(model);
        
        let retVal: object;
        let productId = 0;
        
        return this._productManager.addProduct(model.name, model.price)
            .then(product =>
            {
                retVal = {
                    id: product.id,
                    name: product.name,
                    price: product.price
                };
                productId = product.id;
            }).then(product =>
            {
                return this._configService.getBaseUrl();
            }).then(baseUrl =>
            {     
                Object.assign(retVal,
                    {
                        links: {
                            self: this.generateUrl(Routes.getProduct, { id: productId }, baseUrl),
                            update: this.generateUrl(Routes.updateProduct, { id: productId }, baseUrl),
                            delete: this.generateUrl(Routes.deleteProduct, { id: productId }, baseUrl)
                        }
                    });
                console.log(retVal);
                return retVal;
            });
        
        
            
        // });
        // return this._configService.getBaseUrl()
        //     .then(baseUrl =>
        //     {
        //         return {
        //             id: product.id,
        //             name: product.name,
        //             price: product.price,
        //             links: {
        //                 self: this.generateUrl(Routes.getProduct, { id: product.id }, baseUrl),
        //                 update: this.generateUrl(Routes.updateProduct, { id: product.id }, baseUrl),
        //                 delete: this.generateUrl(Routes.deleteProduct, { id: product.id }, baseUrl)
        //             }
        //         };
        //     });
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
    id: number;
    name: string;
    price: number;
}