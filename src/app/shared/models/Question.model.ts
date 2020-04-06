import { Deserializable } from './Deserializable.model';

export class Question implements Deserializable{

    public picUrl:any[];
    public remind:string;
    
    
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    
}