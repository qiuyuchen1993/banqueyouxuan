import { Component, OnInit, Input } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Comment } from '../shared/models/Comment.model.js'
import { HomeService } from '../home/home.service.js'
import { CommentMessage } from '../shared/models/CommentMessage.model.js';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() product_id:any;
  token:any;
  comments:Comment[];
  currentcomment:string;
  // displayedColumns: string[] = ['comment'];
  // dataSource = new MatTableDataSource();
  constructor(private homesvc: HomeService) { 
    
  }

  ngOnInit() {

   this.token = sessionStorage.getItem('token');
   console.log(this.token)
    this.homesvc.get10comment(this.product_id).subscribe(
      (res)=>{
        this.comments=res.data;console.log(this.comments);
        for (let key in this.comments){
          this.comments[key].content=this.HTMLDecode( this.comments[key].content)
        }
      }
    )
  }

  HTMLEncode(html:any) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
    }

  HTMLDecode(text:any) { 
      var temp = document.createElement("div"); 
      temp.innerHTML = text; 
      var output = temp.innerText || temp.textContent; 
      temp = null; 
      return output; 
      } 

}
