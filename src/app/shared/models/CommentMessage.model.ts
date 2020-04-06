import { Comment } from './Comment.model';
import { Deserializable } from './Deserializable.model';

export class CommentMessage  implements Deserializable {
   deserialize(input: any): this {
    Object.assign(this, input);
    if(input.data !=null){
        this.data = input.data.map(data => new Comment().deserialize(data));
      }
      return this;
   }
   public code: string;
   public message?: any;
   public data: Comment[];
}