import * as assert from "assert";
import { ConfigService } from "./../src/services/config-service/config-service";
import { DefaultConfigService } from "./../src/services/config-service/default-config-service";

suite("ConfigService", () =>
{
    let configService: ConfigService;
    
    suiteSetup(() =>
    {
        configService = new DefaultConfigService();
    });
    
    test("getBaseUrl", async () =>
    {
        let baseUrl = await configService.getBaseUrl();
        assert.strictEqual(baseUrl, "http://localhost:3000");
    });
});