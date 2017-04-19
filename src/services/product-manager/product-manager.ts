import { Product } from "./../../models/product";

export interface ProductManager
{
    getProducts(): Promise<Array<Product>>;
    addProduct(name: string, price: number): Promise<Product>;
    updateProduct(id: number, name: string, price: number): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
}