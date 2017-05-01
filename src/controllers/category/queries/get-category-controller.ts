import { Category } from "./../../../models/category";
import { given } from "n-defensive";
import { CategoryManager } from "./../../../services/category-manager/category-manager";
import { httpGet, httpRoute, Controller } from "n-web";
import * as Routes from "./../../routes";
import { CategoryNotFoundException } from "./../../../exceptions/category-not-found-exception";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";

@httpGet
@httpRoute(Routes.getCategory)
@inject("CategoryManager", "ConfigService")
export class GetCategoryController extends Controller
{
    private readonly _categoryManager: CategoryManager;
    private readonly _configService: ConfigService;


    public constructor(categoryManager: CategoryManager, configService: ConfigService)
    {
        given(categoryManager, "categoryManager").ensureHasValue();
        given(configService, "configService").ensureHasValue();
        super();
        this._categoryManager = categoryManager;
        this._configService = configService;
    }


    public async execute(id: number): Promise<any>
    {
        let categories = await this._categoryManager.getCategories();
        let category = categories.find(cat => cat.id === id); // implement getCategoryById()

        if (category == null)
            throw new CategoryNotFoundException(id);

        let baseUrl = await this._configService.getBaseUrl();

        return {
            id: category.id,
            name: category.name,
            description: category.description,
            links: {
                self: this.generateUrl(Routes.getCategory, { id: category.id }, baseUrl),
                update: this.generateUrl(Routes.updateCategory, { id: category.id }, baseUrl),
                delete: this.generateUrl(Routes.deleteCategory, { id: category.id }, baseUrl)
            }
        };
    }

    // public getCategoryById();

}    