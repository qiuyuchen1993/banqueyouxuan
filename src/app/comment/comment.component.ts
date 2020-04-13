import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Comment } from '../shared/models/Comment.model.js'
import { HomeService } from '../home/home.service.js'
import { CommentMessage } from '../shared/models/CommentMessage.model.js';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() product_id: any;
  token: any;
  comments: Comment[];
  currentcomment: string;
  // displayedColumns: string[] = ['comment'];
  // dataSource = new MatTableDataSource();
  constructor(private homesvc: HomeService, public dialog: MatDialog) {

  }

  ngOnInit() {

    this.token = sessionStorage.getItem('token');
    console.log(this.token)
    this.homesvc.get10comment(this.product_id).subscribe(
      (res) => {
        this.comments = res.data;
        for (let key in this.comments) {
          this.comments[key].content = this.HTMLDecode(this.comments[key].content)
        }
      }
    )
    
  }

  submitComment() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.homesvc.postComment(this.token, this.currentcomment, this.product_id).subscribe(
        (res) => {
          if (res.code == "OK") {
            // console.log(res)
            // this.comments.push(res.data);
            this.homesvc.get10comment(this.product_id).subscribe(
              (res) => {
                this.comments = res.data;
                for (let key in this.comments) {
                  this.comments[key].content = this.HTMLDecode(this.comments[key].content)
                }
              }
            )
          }

        }
      )
    } else {
      this.homesvc.snackbarshow("请先登陆，再来评论")
    }
  }

  selectComment(comment, reply?:any) {
    const submitReply = this.submitReply.bind(this);
    this.dialog.open(ReplyDialog, {
      data: { comment, reply, submitReply }
    });
  }
  
  submitReply(comment, commentStr, reply) {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.homesvc.postReply(this.token, commentStr, comment.id, reply&&reply.id || null).subscribe(
        (res) => {
          if (res.code == "OK") {
            // console.log(res)
            // this.comments.push(res.data);
            this.dialog.closeAll();
            this.homesvc.get10comment(this.product_id).subscribe(
              (res) => {
                this.comments = res.data;
                for (let key in this.comments) {
                  this.comments[key].content = this.HTMLDecode(this.comments[key].content)
                }
              }
            )
          }

        }
      )
    } else {
      this.homesvc.snackbarshow("请先登陆，再来评论")
    }
  }

  moreReply(comment) {
    this.homesvc.getMoreReply(comment.id, comment.time).subscribe(
      res => {
        if(res.code == "OK") {
          comment.replys = res.data['replys'];
          comment.hasMoreReply = res.data['hasMoreReply'];
        }
      }
    )
  }

  HTMLEncode(html: any) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
  }

  HTMLDecode(text: any) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }

}


@Component({
  selector: 'reply-dialog',
  templateUrl: 'reply-dialog.html',
})
export class ReplyDialog {
  currentcomment;
  constructor(@Inject(MAT_DIALOG_DATA) public data) { }
}
