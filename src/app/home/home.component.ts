import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { HomeService } from './home.service.js'
import { Product } from '../shared/models/Product.model.js'
import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';

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
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  products:Product[];
  constructor(private homesvc: HomeService, private dateformat: DatePipe){
    this.currentTimeString = dateformat.transform(this.currenttime, 'yyyyMMddHHmmss');
  }
  ngOnInit() {
    // this.currentTimeString = this.currenttime.toTimeString();
    this.dataSource.paginator = this.paginator;
    this.homesvc.get10Products(this.currentTimeString).subscribe(
      products => {
        // this.products = products;
      this.dataSource.data = products;
      this.nextpagetime=products[products.length-1].time;}

    );
  }

  clicknextpage(){
    this.homesvc.get10Products(this.nextpagetime).subscribe(
      products => {
        const data = this.dataSource.data;
        products.map(product => data.push(product))
        this.dataSource.data = data;
        // products.map(product => this.dataSource.data.push(product))
        // this.dataSource.data = products;
      this.nextpagetime=products[products.length-1].time;}
    );
  }
}


