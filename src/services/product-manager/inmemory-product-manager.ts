import { ProductManager } from "./product-manager";
import { Product } from "./../../models/product";
import "n-ext";
import { ApplicationException } from "n-exception";
import { given } from "n-defensive";
import { Logger } from "./../logger/logger";
import { inject } from "n-ject";

@inject("Logger")
export class InmemoryProductManager implements ProductManager
{
    private readonly _products: Array<Product> = [];
    private readonly _logger: Logger;
    
    public constructor(logger: Logger)
    {
        given(logger, "logger").ensureHasValue();
        this._logger = logger;
    }
    
    public async getProducts(): Promise<Product[]>
    {
        await this._logger.logInfo("Getting PRODUCTs");
        return this._products.map(p => p);
    }
    
    public async addProduct(name: string, price: number): Promise<Product>
    {
        given(name, "name").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());

        let lastId = this._products.length === 0 ? 0 : this._products.orderByDesc(p => p.id)[0].id;
        let product = new Product(lastId + 1, name, price);
        this._products.push(product);
        await this._logger.logInfo(`Added PRODUCT with id ${product.id}`);
        return product;
    }
    
    public async updateProduct(id: number, name: string, price: number): Promise<Product>
    {
        given(id, "id").ensureHasValue().ensure(p => p > 0);
        given(name, "name").ensureHasValue().ensure(p => !p.isEmptyOrWhiteSpace());

        let product = this._products.find(p => p.id === id);
        if (product == null)
            throw new ApplicationException("Product with id {0} not found.".format(id));

        this._products.remove(product);
        product = new Product(product.id, name, price);
        this._products.push(product);
        await this._logger.logInfo(`Updated PRODUCT with id ${product.id}`);
        return product;
    }
    
    public async deleteProduct(id: number): Promise<void>
    {
        given(id, "id").ensureHasValue();

        let product = this._products.find(p => p.id === id);
        if (product == null)
        {
            await this._logger.logError(`Attempted to delete non existent PRODUCT with id ${id}.`);
            return;
        }

        this._products.remove(product);
        await this._logger.logWarning(`PRODUCT with id ${id} deleted.`);
    }
}