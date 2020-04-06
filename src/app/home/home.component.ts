import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { HomeService } from './home.service.js'
import { Product } from '../shared/models/Product.model.js'
import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  providers:[HomeService, DatePipe]
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource();
  currenttime = new Date();
  currentTimeString:string;
  nextpagetime:string;
  keyword:string;
  searchmode = false;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  products:Product[];
  constructor(private route: ActivatedRoute, private homesvc: HomeService, private dateformat: DatePipe){
    this.currentTimeString = dateformat.transform(this.currenttime, 'yyyyMMddHHmmss');
    this.route.params.subscribe((params) =>{
      // console.log(params.keyword);
      // this.keyword = this.route.snapshot.paramMap.get("keyword");
      if(params.keyword != null){
      this.searchmode = true;
      this.homesvc.search(params.keyword, this.currentTimeString).subscribe(
        message =>{
          this.dataSource.data = message.data;
        }
      );
      }else{
      this.searchmode = false;
      this.homesvc.get10Products(this.currentTimeString).subscribe(
        message => {
          // this.products = products;
        this.dataSource.data = message.data;
        this.nextpagetime=message.data[message.data.length-1].time;},
        error =>{this.homesvc.snackbarshow(error)}
  
      );}
    })
  }
 

  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.keyword = this.route.snapshot.paramMap.get("keyword");
    if(this.keyword != null){
    this.searchmode = true;
    this.homesvc.search(this.keyword, this.currentTimeString).subscribe(
      message =>{
        this.dataSource.data = message.data;
      }
    );
    }else{
    this.searchmode = false;
    this.homesvc.get10Products(this.currentTimeString).subscribe(
      message => {
        // this.products = products;
      this.dataSource.data = message.data;
      this.nextpagetime=message.data[message.data.length-1].time;}

    );}
  }

  
    
  
 
  // clickbackpage(){
  //   this.searchmode = false;
  //   this.homesvc.get10Products(this.currentTimeString).subscribe(
  //     message => {
  //       // this.products = products;
  //     this.dataSource.data = message.data;
  //     this.nextpagetime=message.data[message.data.length-1].time;}

  //   );
  // }

  clicknextpage(){
    this.homesvc.get10Products(this.nextpagetime).subscribe(
      message => {
        const data = this.dataSource.data;
        message.data.map(product => data.push(product))
        this.dataSource.data = data;
        // products.map(product => this.dataSource.data.push(product))
        // this.dataSource.data = products;
      this.nextpagetime=message.data[message.data.length-1].time;}
    );
  }
}


