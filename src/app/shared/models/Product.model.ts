import { Deserializable } from './Deserializable.model';

export class Product implements Deserializable{

    public id:number;
    public title:string;
    public price:number;
    public priceTag:string;
    public type:number;
    public channel: number;
    public time:string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    
}