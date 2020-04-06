import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/Product.model'


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  @Injectable()
  export class HomeService{
    constructor(private http: HttpClient) {
      }

    //   Get products
    // public getProducts(): Observable<Product[]>{
    //     return this.http.get<Product[]>('http://www.eeeasybuy.com/api/discountprovider/getList/10/20190822104911')
    //   .pipe(
    //       map(res => new Product().deserialize(res))
    //   );
    // }

    public get10Products(time:string): Observable<Product[]>{
      return this.http.get<Product[]>(`https://www.eeeasybuy.com/api/discountprovider/getList/10/${time}`)
    }

  }