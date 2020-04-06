import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service.js'
import { Product } from 'src/app/shared/models/Product.model.js';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers:[HomeService]
})
export class ProductDetailComponent implements OnInit {
  id:string;
  product = new Product();
  product_link:string;
  coupon_link:string;
  constructor(private route: ActivatedRoute,private homesvc: HomeService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.homesvc.getProductsByID(this.id).subscribe(
      detail =>{
        this.product = detail.data;
        if(this.product.couponName != null){
          this.homesvc.get_coupon_link(this.product.couponId).subscribe(
            link =>{
              this.coupon_link = link.data;
            }
          )
        }
      }
    );
    this.homesvc.get_discount_link(this.id).subscribe(
      link =>{
        this.product_link = link.data;
      }
    )
    
  }

}
