import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { AvatarCutterComponent } from './avatar-cutter/avatar-cutter.component';

const routes: Routes = [
  { path: '', component: HomeComponent 
},
  { path: 'product/:id', component: ProductDetailComponent 
},
{
  path: 'userpic', component: AvatarCutterComponent
},
  { path: ':keyword', component: HomeComponent 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
