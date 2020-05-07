import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { HomeService } from './home/home.service';
import { CommentComponent, ReplyDialog } from './comment/comment.component';
import { AvatarCutterComponent } from './avatar-cutter/avatar-cutter.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    RegisterDialogComponent,
    CommentComponent,
    ReplyDialog,
    AvatarCutterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ImageCropperModule
  ],
  entryComponents:[
    RegisterDialogComponent, ReplyDialog
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
