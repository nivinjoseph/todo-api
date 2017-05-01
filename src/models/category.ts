export class Category
{
    private readonly _id: number;
    private readonly _name: string;
    private readonly _description: string;
    
    
    public get id(): number { return this._id; }
    public get name(): string { return this._name; }
    public get description(): string { return this._description; }
    
    
    public constructor(id: number, name: string, description: string)
    {
        this._id = id;
        this._name = name;
        this._description = description;        
    }
}