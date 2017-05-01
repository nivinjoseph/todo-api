import { Category } from "./../../models/category";


export interface CategoryManager
{
    getCategories(): Promise<Array<Category>>;
    addCategory(name: string, description: string): Promise<Category>;
    updateCategory(id: number, name: string, description: string): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}