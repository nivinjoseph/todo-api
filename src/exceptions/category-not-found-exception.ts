import { ApplicationException } from "n-exception";
import "n-ext";

export class CategoryNotFoundException extends ApplicationException
{
    public constructor(id: number)
    {
        super("Category with ID '{0}' not found".format(id));
    }
}