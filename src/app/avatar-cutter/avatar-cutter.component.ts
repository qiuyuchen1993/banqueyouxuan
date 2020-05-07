import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-avatar-cutter',
  templateUrl: './avatar-cutter.component.html',
  styleUrls: ['./avatar-cutter.component.css']
})
export class AvatarCutterComponent implements OnInit, OnDestroy {

  imageChangedEvent: any = '';
  imgURL;
  returnType = 'file';
  @ViewChild('file', { static: false }) file;
  constructor(private snackBar: MatSnackBar,  private homesvc: HomeService, private router: Router) { }

  ngOnInit() {
    let userpic = localStorage.getItem('userpic');
    this.imgURL = userpic || '';
  }
  ngOnDestroy() {
  }
  // 从base64转化为file文件
  base64ToFile(base64Str, fileName) {
    const params = base64Str.split(',')
    const mime = params[0].match(/:(.*?)/)[1]
    const fileData = atob(params[1]) // 解码Base64
    let { length } = fileData
    const uint8Array = new Uint8Array(length)
    while (length) {
      length -= 1
      uint8Array[length] = fileData.charCodeAt(length)
    }
    return new File([uint8Array], fileName, { type: mime })
  }
  // 获取驼峰写法
  getCamelCase(text) {
    return text.replace(/-[a-z]+?/g, matchStr => matchStr[1].toUpperCase())
  }
  // 获取首单词大写
  getWord(text) {
    return text[0].toUpperCase() + text.substr(1)
  }
  upload() {
    this.file.nativeElement.click();
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.imgURL = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    this.snackBar.open("Failed to load image")
  }
  // 确认
  onEnter() {
    if (this.imgURL) {
      if (this.returnType === 'url') {
        // this.avatarEvent.emit(this.imgURL) // 返回链接
        this.onCancel()
      } else if (this.returnType === 'file') {
        // this.avatarEvent.emit(this.base64ToFile(this.imgURL, 'avatar.png')) // 返回文件
        this.onCancel()
      }
    } else {
      this.snackBar.open('请上传图片', 'error')
    }
  }
  // 取消
  onCancel() {
    // this.avatarEvent.emit('cancel')
    history.back();
  }

}
