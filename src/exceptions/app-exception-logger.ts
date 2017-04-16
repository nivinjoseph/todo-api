import { ExceptionLogger } from "n-web";
import { Logger } from "./../services/logger/logger";
import { Exception } from "n-exception";
import { given } from "n-defensive";
import { inject } from "n-ject";

@inject("Logger")
export class AppExceptionLogger extends ExceptionLogger
{
    private readonly _logger: Logger;
    
    
    public constructor(logger: Logger)
    {
        given(logger, "logger").ensureHasValue();
        super();
        this._logger = logger;
    }
    
    
    public log(exp: Exception): Promise<void>
    {
        return this._logger.logError(exp);
    }
}