import * as assert from "assert";

class Foo
{
    
}

suite.skip("Random stuff", () =>
{
    suite("Class instantiations", () =>
    {
        test("Normal instantiation", () =>
        {
            let foo = new Foo();
            
            assert.ok(foo !== null);
        });
        
        test("Abnormal instantiation", () =>
        {
            let fooClass = {registration: Foo};
            let instance = new (<any>fooClass.registration)();
            assert.ok(instance !== null);
        });
    });
});