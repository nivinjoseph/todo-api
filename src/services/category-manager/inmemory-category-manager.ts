import { CategoryManager } from "./category-manager";
import { Category } from "./../../models/category";
import "n-ext";
import { ApplicationException } from "n-exception";
import { given } from "n-defensive";
import { Logger } from "./../logger/logger";
import { inject } from "n-ject";

@inject("Logger")
export class InmemoryCategoryManager implements CategoryManager
{
    private readonly _categories: Array<Category> = [];
    private readonly _logger: Logger;


    public constructor(logger: Logger)
    {
        given(logger, "logger").ensureHasValue();
        this._logger = logger;
    }

    
    public getCategories(): Promise<Category[]>
    {
        return this._logger.logInfo("Getting Categories").then(() =>
        {
            return this._categories.map(cat => cat);
        });
    }

    public addCategory(name: string, description: string): Promise<Category>
    {
        given(name, "name").ensureHasValue().ensure(cat => !cat.isEmptyOrWhiteSpace());

        let lastId = this._categories.length === 0 ? 0 : this._categories.orderByDesc(cat => cat.id)[0].id;
        let category = new Category(lastId + 1, name, description);

        this._categories.push(category);

        return this._logger.logInfo(`Added Category with ID ${category.id}`).then(() =>
        {
            return category;
        });
    }

    public async updateCategory(id: number, name: string, description: string): Promise<Category>
    {
        given(id, "id").ensureHasValue().ensure(cat => cat > 0);
        given(name, "name").ensureHasValue().ensure(cat => !cat.isEmptyOrWhiteSpace());

        let category = this._categories.find(cat => cat.id === id);
        if (category == null)
            throw new ApplicationException("Category with id {0} not found.".format(id));

        this._categories.remove(category);
        category = new Category(category.id, name, description);
        this._categories.push(category);
        await this._logger.logInfo(`Updated Category with ID ${category.id}`);
        return category;
    }

    public async deleteCategory(id: number): Promise<void>
    {
        given(id, "id").ensureHasValue();

        let category = this._categories.find(cat => cat.id === id);
        if (category == null)
        {
            await this._logger.logError(`Attempted to delete non-existent Category with ID ${id}.`);
            return;
        }

        this._categories.remove(category);
        await this._logger.logWarning(`Category with ID ${id} deleted.`);
    }
}