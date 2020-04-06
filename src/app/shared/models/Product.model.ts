import { Deserializable } from './Deserializable.model';

export class Product implements Deserializable{

    public id:number;
    public title:string;
    public price:number;
    public priceTag:string;
    public type:number;
    public channel: number;
    public time:string;
    public photoLink:string;
    public introduction:string;
    public itemId:string;
    public unitNames:string;
    public count:string;
    public couponId:string;
    public couponName:string;
    public authorId:string;
    public state:string;
    public like:string;
    public dislike:string;
    
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    
}