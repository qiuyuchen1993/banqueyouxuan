import { Deserializable } from './Deserializable.model';
export class Comment  implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        if(input.reply !=null){
            this.reply = input.reply.map(reply => new Comment().deserialize(reply));
          }
          return this;
     }
    public id?: any;
    public content?: any;
    public time?: any;
    public authorName?: any;
    public authorProfilePicture?: any;
    public like?: any;
    public dislike?: any;
    public reply?:Comment[];
 }