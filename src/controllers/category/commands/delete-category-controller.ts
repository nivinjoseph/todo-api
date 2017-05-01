import { CategoryManager } from "./../../../services/category-manager/category-manager";
import { given } from "n-defensive";
import { httpDelete, httpRoute, Controller } from "n-web";
import * as Routes from "./../../routes";
import { inject } from "n-ject";

@httpDelete
@httpRoute(Routes.deleteCategory)
@inject("CategoryManager")
export class DeleteCategoryController extends Controller
{
    private readonly _categoryManager: CategoryManager;
    
    
    public constructor(categoryManager: CategoryManager)
    {
        given(categoryManager, "categoryManager").ensureHasValue();
        super();
        this._categoryManager = categoryManager;
    }
    
    
    public execute(id: number): Promise<any>
    {
        return this._categoryManager.deleteCategory(id);
    }
}