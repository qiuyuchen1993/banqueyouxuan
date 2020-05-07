import { Component } from '@angular/core';
// import { HomeService } from './home/home.service.js'
import { Product } from './shared/models/Product.model.js'
import {MatDialog } from '@angular/material/dialog';
import {RegisterDialogComponent} from './register-dialog/register-dialog.component'
import { HomeService } from './home/home.service.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvatarCutterComponent } from './avatar-cutter/avatar-cutter.component.js';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HomeService]
})
export class AppComponent {
  title = 'eeeasybuy';
  keyword:string;
  currenttime = new Date();
  currentTimeString:string;
  products:Product[];
  isNavbarCollapsed = true;
  username: string;
  token: string;
  userpic: string;
  
  constructor(public dialog: MatDialog, private homesvc:HomeService) {}

  ngOnInit(){
    this.username = sessionStorage.getItem('username')
    if(this.username != undefined){
    this.username = sessionStorage.getItem('username')
    this.userpic = sessionStorage.getItem('userpic')
  }
  }

  logout(){
    this.homesvc.logout(this.token).subscribe(info=>{
      if(info.code="ok"){
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('userpic')
        sessionStorage.removeItem('token')
        this.username = sessionStorage.getItem('username')
        this.userpic = sessionStorage.getItem('userpic')
      }
    
    })
  }
  openRegisterDialog(option:string): void {
    let dialogRef = this.dialog.open(RegisterDialogComponent, {
      height: '400px',
      width: '800px',
      data: {option:option}
    });

  

    dialogRef.afterClosed().subscribe(result => {
      this.username = sessionStorage.getItem('username')
      if(this.username != undefined){
      this.username = sessionStorage.getItem('username')
      this.userpic = sessionStorage.getItem('userpic')
    }
    });
  }

  updateAvatar() {
    this.dialog.open(AvatarCutterComponent, {height: '100%', width: '100%', data: {token: this.token}})
  }

}
