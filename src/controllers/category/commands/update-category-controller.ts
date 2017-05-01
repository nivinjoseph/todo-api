import { CategoryManager } from "./../../../services/category-manager/category-manager";
import { given } from "n-defensive";
import { Category } from "./../../../models/category";
import { httpPut, httpRoute, Controller, HttpException } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";
import { Validator, strval } from "n-validate";

@httpPut
@httpRoute(Routes.updateCategory)
@inject("CategoryManager", "ConfigService")
export class UpdateCategoryController extends Controller
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
    
    
    public async execute(id: number, model: Model): Promise<any>
    {
        this.validateModel(model);
        
        let category = await this._categoryManager.updateCategory(id, model.name, model.description);        
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
    
    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();
        validator.for<string>("name").isRequired().useValidationRule(strval.hasMaxLength(10));
        validator.for<string>("description").isOptional().useValidationRule(strval.hasMaxLength(100));
        
        validator.validate(model);
        if (validator.hasErrors)
            throw new HttpException(400, validator.errors);    
    }
}    

interface Model
{
    name: string;
    description: string;
}