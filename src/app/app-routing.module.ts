import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { RegisterComponent } from './common/register/register.component';
import { LoginComponent } from './common/login/login.component';
import { ErrorComponent } from './common/error/error.component';

import { LogoutComponent } from './common/logout/logout.component';
import { ActivateComponent } from './common/activate/activate.component';
import { ForgotpasswordComponent } from './common/forgotpassword/forgotpassword.component';
 
import { NewpasswordComponent } from './common/newpassword/newpassword.component';
import { ProductCatagoryComponent } from './admin/product-catagory/product-catagory.component';
import { ProductSubCatagoryComponent } from './admin/product-sub-catagory/product-sub-catagory.component';
 
 
import { UsersComponent } from './admin/setting/users/users.component';
import { SettingComponent } from './admin/setting/setting.component';
import { PostComponent } from './user/post/post.component';
import { PostNewComponent } from './user/post/post-new/post-new.component';
 
import { LayoutComponent } from './demo/layout/layout.component';
import { PostdisplayComponent } from './common/post/postdisplay/postdisplay.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ChangeProfileImageComponent } from './user/profile/change-profile-image/change-profile-image.component';
import { EditpostComponent } from './user/post/editpost/editpost.component';
import { SpecificationheadComponent } from './admin/specificationhead/specificationhead.component';
import { SpecificationheadFormComponent } from './admin/specificationhead/specificationhead-form/specificationhead-form.component';
 
 
 

const routes: Routes = [
  {path:"",component:HomeComponent},

  //common section
  
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"logout",component:LogoutComponent},//,canActivate:[RouteGuardService]},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"activate/:token",component:ActivateComponent},
  {path:"register",component:RegisterComponent},
 
{ path:"newpassword/:token",component:NewpasswordComponent},

  {path:"display/adv/:id",component:PostdisplayComponent},

// admin  pages
  {path:"admin/catagory",component:ProductCatagoryComponent},
   {path:"admin/users",component:UsersComponent},
   {path:"admin/setting",component:SettingComponent},
   {path:"admin/specification",component:SpecificationheadComponent},
   {path:"admin/specificationform",component:SpecificationheadFormComponent},
   {path:"admin/subcatagory",component:ProductSubCatagoryComponent},

  //user pages
 
  {path:"user/newpost",component:PostNewComponent},
  {path:"user/editpost/:id",component:EditpostComponent},
  {path:"user/profile",component:ProfileComponent},
  {path:"user/post",component:PostComponent},
  {path:"demo",component:ChangeProfileImageComponent},
  {path:"**",component:ErrorComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
