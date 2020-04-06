import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeService } from '../home/home.service'

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  phone:string;
  isphoneready = false;
  isRegister:boolean;
  piclist = [];
  indexlist = [];
  remind: string;
  isVeriCode = false;
  isLoginSMSsent = false;
  verifycode:any;
  token:string;
  logincode:string;
  userinfo: any;
  username: any;
  isNameChanged = false;
  changedusername:any;
  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private homesvc: HomeService) { }
    
    varify_machine(){
     this.homesvc.checkSMS(this.phone,this.verifycode).subscribe(
       veriInfo =>{
         if(veriInfo.code =="OK"){
           
           this.homesvc.snackbarshow("注册成功")
           sessionStorage.setItem('token', veriInfo.data); 
          this.token = sessionStorage.getItem('token');
          this.homesvc.getInfo(this.token).subscribe(info1=>{
            sessionStorage.setItem('username', info1.data.name); 
            sessionStorage.setItem('userpic', info1.data.profilePicture); 
            this.isNameChanged = true;
            // this.dialogRef.close();
          })
          //  this.dialogRef.close();
         }else{
          this.homesvc.snackbarshow(veriInfo.message)
          this.dialogRef.close();
         }
       },
       error =>{this.homesvc.snackbarshow(error)}
     )
    }
    change_name(){
      this.homesvc.setName(this.changedusername, this.token).subscribe(
        info2=>{
          if(info2.data=="OK"){
            sessionStorage.setItem('username', this.changedusername); 
            this.dialogRef.close();
          }else{
            this.homesvc.snackbarshow(info2.message)
          }
        }
      )
    }

    onKey(){
      if(this.phone.length==11){
        this.indexlist=[];
        this.piclist=[];
        this.homesvc.machineVerify(this.phone).subscribe(
          veriInfo => {
            if(veriInfo.data!=null){
            // console.log(veriInfo)
            // this.piclist = new Map(veriInfo.data.picUrl);
            for(let i of Object.keys(veriInfo.data.picUrl))
            {
              this.indexlist.push(i)
            }
            for(let i of Object.values(veriInfo.data.picUrl)){
              this.piclist.push(i)
            }
            // veriInfo.data.picUrl.map((key, value) => {
            //   console.log('key:', key, value);
            // });
            this.remind = "请选出提示中的产品,"+veriInfo.data.remind;
          }else{
            this.homesvc.snackbarshow(veriInfo.message)
          }
          },
          error =>{this.homesvc.snackbarshow(error)}
    
        )
      }
    }

  verifyanswer(index:string){
    //检查注册时的图片答案
    console.log(this.indexlist[index])
    this.homesvc.checkAnswer(this.phone,this.indexlist[index]).subscribe(
      info=>{
        if(info.code == "OK"){
          this.isVeriCode = true;
          this.homesvc.snackbarshow("获取验证码成功")
        }else{
          this.homesvc.snackbarshow(info.message)
          
        }
      }
    )
  }


  login_verify(){
    this.homesvc.loginSMS(this.phone, "login").subscribe(
      info=>{
        if(info.code == "OK"){
          this.isVeriCode = true;
          this.homesvc.snackbarshow("获取验证码成功")
          this.isLoginSMSsent = true;
        }else{
          this.homesvc.snackbarshow(info.message)
          
        }
      }
    )
  }

  login_sendcode(){
    this.homesvc.login(this.phone, this.logincode).subscribe(
      info=>{
        if(info.message=="验证失败，请重新获取"){
          this.isLoginSMSsent = false;
          this.homesvc.snackbarshow(info.message)
        }else{
          sessionStorage.setItem('token', info.data); 
          this.token = sessionStorage.getItem('token');
          this.homesvc.getInfo(this.token).subscribe(info1=>{
            sessionStorage.setItem('username', info1.data.name); 
            sessionStorage.setItem('userpic', info1.data.profilePicture); 
            this.dialogRef.close();
          })
        }
      }
    )
  }

  ngOnInit() {
    if(this.data.option=="register"){
      this.isRegister = true;
    }else{
      this.isRegister = false;
    }
  }

}
