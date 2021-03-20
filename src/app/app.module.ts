import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule}  from '../app/material/material.module'
import {FlexLayoutModule} from '@angular/flex-layout';
 
import { ActivateComponent } from './common/activate/activate.component';
import { ErrorComponent } from './common/error/error.component';
import { FooterComponent } from './common/footer/footer.component';
import { ForgotpasswordComponent } from './common/forgotpassword/forgotpassword.component';
import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './common/login/login.component';
import { LogoutComponent } from './common/logout/logout.component';
import { NewpasswordComponent } from './common/newpassword/newpassword.component';
import { RegisterComponent } from './common/register/register.component';
import { ProductCatagoryComponent } from './admin/product-catagory/product-catagory.component';
import { ProductSubCatagoryComponent } from './admin/product-sub-catagory/product-sub-catagory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpIntercepterService } from './service/http/http-intercepter.service';
 import { CKEditorModule } from 'ckeditor4-angular';
 import { CatagoryFormComponent } from './admin/product-catagory/catagoryForm/catagory-form/catagory-form.component';
 import { SubCatagoryFormComponent } from './admin/product-sub-catagory/subCatagoryForm/sub-catagory-form/sub-catagory-form.component';
import { SubCatagoryYesNoComponent } from './admin/product-sub-catagory/dialog/sub-catagory-yes-no/sub-catagory-yes-no.component';
import { UserFormComponent } from './admin/setting/users/userForm/user-form/user-form.component';
import { UserYesNoDialogComponent } from './admin/setting/users/userYesNoDialog/user-yes-no-dialog/user-yes-no-dialog.component';
import { SettingComponent } from './admin/setting/setting.component';
import { UsersComponent } from './admin/setting/users/users.component';
import { CurrencyComponent } from './admin/setting/currency/currency.component';
import { CurrencyFormComponent } from './admin/setting/currency/currency-form/currency-form.component';
import { CurrencyYesNoFormComponent } from './admin/setting/currency/currency-yes-no-form/currency-yes-no-form.component';
import { LocationComponent } from './admin/setting/location/location.component';
import { LocationFormComponent } from './admin/setting/location/location-form/location-form.component';
import { LocationYesNoFormComponent } from './admin/setting/location/location-yes-no-form/location-yes-no-form.component';
import { PostComponent } from './user/post/post.component';
import { PostNewComponent } from './user/post/post-new/post-new.component';
 import { EditpostComponent } from './user/post/editpost/editpost.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { LayoutComponent } from './demo/layout/layout.component';
import { PostdisplayComponent } from './common/post/postdisplay/postdisplay.component';
import { PostImageDialogComponent } from './common/post/post-image-dialog/post-image-dialog.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PersonalInformationComponent } from './user/profile/personal-information/personal-information.component';
import { ChangeAddressComponent } from './user/profile/change-address/change-address.component';
import { ChangePasswordComponent } from './user/profile/change-password/change-password.component';
import { ChangePhoneComponent } from './user/profile/change-phone/change-phone.component';
import { ChangeProfileImageComponent } from './user/profile/change-profile-image/change-profile-image.component';
import { CatagoryYesNoComponent } from './admin/product-catagory/catagory-yes-no/catagory-yes-no.component';
 
import { EditPostYesNoDialogComponent } from './user/post/editpost/edit-post-yes-no-dialog/edit-post-yes-no-dialog.component';
import { SpecificationheadComponent } from './admin/specificationhead/specificationhead.component';
import { SpecificationheadFormComponent } from './admin/specificationhead/specificationhead-form/specificationhead-form.component';
import { SpecificationheadYesNoDialogComponent } from './admin/specificationhead/specificationhead-yes-no-dialog/specificationhead-yes-no-dialog.component';
import { SpecificationheadOptionComponent } from './admin/specificationhead-option/specificationhead-option.component';
import { SpecificationheadOptionFormComponent } from './admin/specificationhead-option/specificationhead-option-form/specificationhead-option-form.component';
import { SpecificationheadOptionYesNoDialogComponent } from './admin/specificationhead-option/specificationhead-option-yes-no-dialog/specificationhead-option-yes-no-dialog.component';
import { RoleComponent } from './admin/setting/users/role/role.component';
import { RoleYesNoDialogComponent } from './admin/setting/users/role/role-yes-no-dialog/role-yes-no-dialog.component';
import { RoleFormComponent } from './admin/setting/users/role/role-form/role-form.component';
import { MgPostListComponent } from './managment/mg-post-list/mg-post-list.component';
import { MgPostDisplayComponent } from './managment/display/mg-post-display/mg-post-display.component';
 
import { AdminPostDisplayComponent } from './admin/post_managment/postlist/admin-post-display/admin-post-display.component';
import { AdminPostlistComponent } from './admin/post_managment/admin-postlist/admin-postlist.component';
import { UserPostDisplayComponent } from './user/post/user-post-display/user-post-display.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { CatagoryPageComponent } from './home/catagory-page/catagory-page.component';
import { SubcatagoryPageComponent } from './home/subcatagory-page/subcatagory-page.component';
import { UserPageComponent } from './home/user-page/user-page.component';
import { PostDisplayPageComponent } from './home/post-display-page/post-display-page.component';
import { CoracelComponent } from './home/homepage/coracel/coracel.component';
import { HomeCatagoryListComponent } from './home/homepage/home-catagory-list/home-catagory-list.component';
import { HeaderComponent } from './common/header/header.component';
import { SidenavListComponent } from './common/sidenav-list/sidenav-list.component';
import { LatestPostSectionComponent } from './home/homepage/latest-post-section/latest-post-section.component';
import { UserPostListComponent } from './user/post/user-post-list/user-post-list.component';
 
 
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    ActivateComponent,

    ErrorComponent,
    FooterComponent,
    ForgotpasswordComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    NewpasswordComponent,
    RegisterComponent,
    UsersComponent,
    ProductCatagoryComponent,
    ProductSubCatagoryComponent,
    CatagoryFormComponent,
   
    SubCatagoryFormComponent,
    SubCatagoryYesNoComponent,
    UserFormComponent,
    UserYesNoDialogComponent,
    SettingComponent,
    LocationComponent,
    LocationFormComponent,
    LocationYesNoFormComponent,
    CurrencyComponent,
    CurrencyFormComponent,
    CurrencyYesNoFormComponent,
    PostComponent,
    PostNewComponent,
   
    EditpostComponent,
    LayoutComponent,
    PostImageDialogComponent,
    PostdisplayComponent,
    ProfileComponent,
    PersonalInformationComponent,
    ChangeAddressComponent,
    ChangePasswordComponent,
    ChangePhoneComponent,
    ChangeProfileImageComponent,
    CatagoryYesNoComponent,
    EditPostYesNoDialogComponent,
    SpecificationheadComponent,
    SpecificationheadFormComponent,
    SpecificationheadYesNoDialogComponent,
    SpecificationheadOptionComponent,
    SpecificationheadOptionFormComponent,
    SpecificationheadOptionYesNoDialogComponent,
    RoleComponent,
    RoleYesNoDialogComponent,
    RoleFormComponent,
    MgPostListComponent,
    MgPostDisplayComponent,
    AdminPostDisplayComponent,
    AdminPostlistComponent,
    UserPostDisplayComponent,
    HomepageComponent,
    CatagoryPageComponent,
    SubcatagoryPageComponent,
    UserPageComponent,
    PostDisplayPageComponent,
    CoracelComponent,
    HomeCatagoryListComponent,
    LatestPostSectionComponent,
    UserPostListComponent,
  
 
 

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    CKEditorModule,
    MatCarouselModule.forRoot()

 
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi: true }
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
