import { Deserializable } from './Deserializable.model';

export class Reply  implements Deserializable {
   deserialize(input: any): this {
      return Object.assign(this, input);
   }

   public code: string;
   public message?: any;
   public data: any;
}