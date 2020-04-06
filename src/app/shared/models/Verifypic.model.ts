import { Deserializable } from './Deserializable.model';
import { Question } from './Question.model';

export class Verifypic  implements Deserializable {
   deserialize(input: any): this {
      return Object.assign(this, input);
   }
   public code: string;
   public message?: any;
   public data: Question;
}