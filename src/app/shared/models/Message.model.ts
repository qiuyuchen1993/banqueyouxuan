import { Product } from './Product.model';
import { Deserializable } from './Deserializable.model';

export class Message  implements Deserializable {
   deserialize(input: any): this {
      return Object.assign(this, input);
   }
   public code: string;
   public message?: any;
   public data: Product[];
}