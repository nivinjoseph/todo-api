import { CategoryManager } from "./../../../services/category-manager/category-manager";
import { given } from "n-defensive";
import { Category } from "./../../../models/category";
import { httpPost, httpRoute, Controller, HttpException } from "n-web";
import * as Routes from "./../../routes";
import { ConfigService } from "./../../../services/config-service/config-service";
import { inject } from "n-ject";
import { Validator, strval } from "n-validate";

@httpPost
@httpRoute(Routes.createCategory)
@inject("CategoryManager", "ConfigService")
export class CreateCategoryController extends Controller
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


    public async execute(model: Model): Promise<any>
    {
        this.validateModel(model);

        let categoryPromise = this._categoryManager.addCategory(model.name, model.description);
        let baseUrlPromise = this._configService.getBaseUrl();
        let category = await categoryPromise;
        let baseUrl = await baseUrlPromise;
        
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