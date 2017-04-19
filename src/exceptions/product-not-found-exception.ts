import { ApplicationException } from "n-exception";
import "n-ext";

export class ProductNotFoundException extends ApplicationException
{
    public constructor(id: number)
    {
        super("Product with id '{0}' not found".format(id));
    }
}