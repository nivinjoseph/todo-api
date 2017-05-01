import { Category } from "./../../../models/category";
import { given } from "n-defensive";
import { CategoryManager } from "./../../../services/category-manager/category-manager";
import { httpGet, httpRoute, Controller } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";

@httpGet
@httpRoute(Routes.getCategories)    
@inject("CategoryManager", "ConfigService")
export class GetCategoriesController extends Controller
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

    
    public async execute(): Promise<object>
    {
        let categories = await this._categoryManager.getCategories();
        let baseUrl = await this._configService.getBaseUrl();
        
        return {
            items: categories.map(cat =>
            {
                return {
                    id: cat.id,
                    name: cat.name,
                    links: {
                        self: this.generateUrl(Routes.getCategory, { id: cat.id }, baseUrl)
                    }
                };
            }),
            links: {
                create: this.generateUrl(Routes.createCategory, null, baseUrl)
            }
        };
    }
}