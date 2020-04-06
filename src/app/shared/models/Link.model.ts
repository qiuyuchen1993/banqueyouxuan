import { Deserializable } from './Deserializable.model';

export class Link  implements Deserializable {
   deserialize(input: any): this {
      return Object.assign(this, input);
   }

   public code: string;
   public message?: any;
   public data: any;
}