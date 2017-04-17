export class Product
{
    private readonly _id: number;
    private readonly _name: string;
    private readonly _price: number;
    
    
    public get id(): number { return this._id; }
    public get name(): string { return this._name; }
    public get price(): number { return this._price; }
    
    
    public constructor(id: number, name: string, price: number)
    {
        this._id = id;
        this._name = name;
        this._price = price;
    }
}