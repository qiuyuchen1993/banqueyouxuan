import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/Product.model'
import { Message } from '../shared/models/Message.model'
import { Detail } from 'src/app/shared/models/Detail.model'
import { Link } from 'src/app/shared/models/Link.model'
import { Verifypic } from '../shared/models/Verifypic.model';
import { Comment } from 'src/app/shared/models/Comment.model'
import { CommentMessage } from '../shared/models/CommentMessage.model';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  @Injectable()
  export class HomeService{
    constructor(private http: HttpClient, public snackBar: MatSnackBar) {
      }

    //   Get products
    // public getProducts(): Observable<Product[]>{
    //     return this.http.get<Product[]>('http://www.eeeasybuy.com/api/discountprovider/getList/10/20190822104911')
    //   .pipe(
    //       map(res => new Product().deserialize(res))
    //   );
    // }

    public get10Products(time:string): Observable<Message>{
      return this.http.get<Message>(`https://www.bqbird.com/api/discount/getList/10/${time}`).pipe(map(res => {return new Message().deserialize(res); 
    }), catchError(this.handleError));
    }

    public getProductsByID(id:string): Observable<Detail>{
      return this.http.get<Detail>(`https://www.bqbird.com/api/discount/getDetail/${id}`)
    }

    public search(keyword:string,time:string): Observable<Message>{
      return this.http.get<Message>(`https://www.bqbird.com/api/discount/search/${keyword}/10/${time}`)
    }

    public get_discount_link(id:string):Observable<Link>{
      return this.http.get<Link>(`https://www.bqbird.com/api/discount/getLink/discount/${id}`).pipe(map(res => {return new Link().deserialize(res); 
    }), catchError(this.handleError));
    }

    public get_coupon_link(id:string):Observable<Link>{
      return this.http.get<Link>(`https://www.bqbird.com/api/discount/getLink/coupon/${id}`).pipe(map(res => {return new Link().deserialize(res); 
    }), catchError(this.handleError));
    }

    public machineVerify(phone : string):Observable<Verifypic>{
    //获取问题
      return this.http.post(`https://www.bqbird.com/api/user/verify/pic/get?phone=${phone}`, {
          
      }).pipe(map(res => 
        {return new Verifypic().deserialize(res)}
        ), catchError(this.handleError) ) }

    public checkAnswer(phone : string, answer : string):Observable<Verifypic>{
      //检查图片答案
      return this.http.post(`https://www.bqbird.com/api/user/verify/pic/checkAndSend?phone=${phone}&answer=${answer}`, {
          
      }).pipe(map(res => 
        {return new Verifypic().deserialize(res)}
        ), catchError(this.handleError) ) }
   
     public checkSMS(phone : string, answer : string):Observable<Link>{
      //检查短信验证
      return this.http.post(`https://www.bqbird.com/api/user/verify/sms/checkAndRegist?phone=${phone}&answer=${answer}`, {
          
      }).pipe(map(res => 
        {return new Link().deserialize(res)}
        ), catchError(this.handleError) ) }

     public loginSMS(phone : string, type : string, token ?:string):Observable<Link>{
        //登陆收取验证码
        return this.http.post(`https://www.bqbird.com/api/user/verify/sms/send/${type}?phone=${phone}&token=${token}`, {
            
        }).pipe(map(res => 
          {return new Link().deserialize(res)}
          ), catchError(this.handleError) ) }

     public login(phone : string, answer : string, token ?:string):Observable<Link>{
      if(token==undefined){
      return this.http.post(`https://www.bqbird.com/api/user/login?phone=${phone}&answer=${answer}`, {
        
      }).pipe(map(res => 
        {return new Link().deserialize(res)}
        ), catchError(this.handleError) ) }else{
          return this.http.post(`https://www.bqbird.com/api/user/login?token=${token}`, {
        
      }).pipe(map(res => 
        {return new Link().deserialize(res)}
        ), catchError(this.handleError) )
        }
      
      }

     public getInfo(token ?:string):Observable<Link>{
     
          return this.http.post(`https://www.bqbird.com/api/user/getInfo?token=${token}`, {
        
      }).pipe(map(res => 
        {return new Link().deserialize(res)}
        ), catchError(this.handleError) )
        
      
      }

      public logout(token ?:string):Observable<Link>{
     
        return this.http.post(`https://www.bqbird.com/api/user/logout?token=${token}`, {
      
    }).pipe(map(res => 
      {return new Link().deserialize(res)}
      ), catchError(this.handleError) )
    }

    public setName(name ?:string, token ?:string):Observable<Link>{
     
      return this.http.post(`https://www.bqbird.com/api/user/setName?name=${name}&token=${token}`, {
    
  }).pipe(map(res => 
    {return new Link().deserialize(res)}
    ), catchError(this.handleError) )
  }

    public get10comment(product_id ?:string){
      return this.http.post(`https://www.bqbird.com/api/comment/get/10?discountId=${product_id}&sort=1`, {
    
  }).pipe(map(res => 
    {return new CommentMessage().deserialize(res)}
    ), catchError(this.handleError) )
    }

//   public getcomments(token ?:string):Observable<Link>{
     
//     return this.http.post(`https://www.bqbird.com/api/comment/get/10/?token=${token}`, {
  
// }).pipe(map(res => 
//   {return new Link().deserialize(res)}
//   ), catchError(this.handleError) )
  

// }


    public snackbarshow(errMsg:string){
      this.snackBar.open(errMsg, "", {
        duration: 5000,
     });
    }
    public handleError(error: Response | any) {
      let errMsg: string;
      if (error instanceof Response ||error instanceof HttpErrorResponse) {
  
        switch (error.status) {
          case 0:
            errMsg = 'No Response Received. Check your network connection.';
            break;
          case 404:
            errMsg = '404 not found, please contact the administrator';
            break;
          case 500:
            errMsg = '500 internal error, please contact the administrator';
            break; 
          default:
            break;
        }
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
    //   window.alert(errMsg);
      // const self = this;
    //   this.snackBar.open(errMsg, "", {
    //     duration: 5000,
    //  });
      return observableThrowError(errMsg);
    }
  }