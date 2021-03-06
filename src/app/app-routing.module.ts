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
 
 
import { ProfileComponent } from './user/profile/profile.component';
import { ChangeProfileImageComponent } from './user/profile/change-profile-image/change-profile-image.component';
import { EditpostComponent } from './user/post/editpost/editpost.component';
import { SpecificationheadComponent } from './admin/specificationhead/specificationhead.component';
import { SpecificationheadFormComponent } from './admin/specificationhead/specificationhead-form/specificationhead-form.component';
import { LogInGuardService } from './service/router-guard/LogIn-guard.service';

import { UserGuardService } from './service/router-guard/user-guard.service';
import { AdmGuardService } from './service/router-guard/adm-guard.service';
import { ManagerGuardService } from './service/router-guard/manager-guard.service';
import { MgPostListComponent } from './managment/mg-post-list/mg-post-list.component';
import { MgPostDisplayComponent } from './managment/display/mg-post-display/mg-post-display.component';
 
import { AdminPostDisplayComponent } from './admin/post_managment/postlist/admin-post-display/admin-post-display.component';
import { AdminPostlistComponent } from './admin/post_managment/admin-postlist/admin-postlist.component';
import { UserPostDisplayComponent } from './user/post/user-post-display/user-post-display.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { SubcatagoryPageComponent } from './home/subcatagory-page/subcatagory-page.component';
import { UserPageComponent } from './home/user-page/user-page.component';
import { PostdisplayComponent } from './common/post/postdisplay/postdisplay.component';
import { PostDisplayPageComponent } from './home/post-display-page/post-display-page.component';
import { CatagoryPageComponent } from './home/catagory-page/catagory-page.component';
import { DepositReciept } from './modules/DepositReciept';
import { FinanceGuardService } from './service/router-guard/finance-guard.service';
import { CasherPageComponent } from './finance/casher-page/casher-page.component';
import { DepositeReceiptFormComponent } from './finance/deposite-receipt-form/deposite-receipt-form.component';
 
 
 

const routes: Routes = [
  {path:"",component:HomepageComponent},
  {path:"display",component:PostDisplayPageComponent},
  {path:"cat",component:CatagoryPageComponent},
  {path:"subcat",component:SubcatagoryPageComponent},
  {path:"user",component:UserPageComponent},
  {path:"",component:HomepageComponent},

  //common section
  
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"logout",component:LogoutComponent,canActivate:[LogInGuardService]},
  {path:"forgotpassword",component:ForgotpasswordComponent},
  {path:"activate/:token",component:ActivateComponent},
  {path:"register",component:RegisterComponent},
 
{ path:"newpassword/:token",component:NewpasswordComponent},

  {path:"display/adv/:id",component:PostdisplayComponent},

// admin  pages
  {path:"admin/catagory",component:ProductCatagoryComponent,canActivate:[AdmGuardService]},
   {path:"admin/users",component:UsersComponent,canActivate:[AdmGuardService]},
   {path:"admin/setting",component:SettingComponent,canActivate:[AdmGuardService]},
   {path:"admin/specification",component:SpecificationheadComponent,canActivate:[AdmGuardService]},
   {path:"admin/specificationform",component:SpecificationheadFormComponent,canActivate:[AdmGuardService]},
   {path:"admin/subcatagory",component:ProductSubCatagoryComponent,canActivate:[AdmGuardService]},
   {path:"admin/post",component:AdminPostlistComponent,canActivate:[AdmGuardService]},
    {path:"admin/postdisplay",component:AdminPostDisplayComponent,canActivate:[AdmGuardService]},
  
   // managment pages
   {path:"managment/postdisplay",component:MgPostDisplayComponent,canActivate:[ManagerGuardService]},
   {path:"managment/post",component:MgPostListComponent,canActivate:[ManagerGuardService]},
 
 //finance pages
 {path:"finance",component:CasherPageComponent,canActivate:[FinanceGuardService]},
 {path:"finance/casher",component:CasherPageComponent,canActivate:[FinanceGuardService]},
 {path:"finance/deposite_form",component:DepositeReceiptFormComponent,canActivate:[FinanceGuardService]},
  // {path:"finance/report",component:DepositeReceiptFormComponent,canActivate:[FinanceGuardService]},

  //user pages
 
  {path:"user/newpost",component:PostNewComponent,canActivate:[LogInGuardService]},
  {path:"user/editpost",component:EditpostComponent,canActivate:[UserGuardService]},
  {path:"user/postdisplay",component:UserPostDisplayComponent,canActivate:[UserGuardService]},
  {path:"user/setting",component:ProfileComponent,canActivate:[UserGuardService]},
  {path:"user/setting/post",component:PostComponent,canActivate:[UserGuardService]},
  
  {path:"demo",component:ChangeProfileImageComponent},
  {path:"error",component:ErrorComponent},
  {path:"**",component:ErrorComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
