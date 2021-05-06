import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/User';
import { UserService } from 'src/app/service/user/user.service';
import { GlobalConstants } from 'src/app/utility/global-constants';


const SERVER_URL = GlobalConstants.serverUrl;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
userImage:String
userName:String
user:User
  constructor(public  userService:UserService) { }

  ngOnInit(): void {
    this.setUserInfo()
  }


  async setUserInfo() {
    const s=await   this.userService.getCurrentUser().toPromise();
    console.log("s data =>"+JSON.stringify(s))
      if(s != undefined) {
        if(s.image_name=== null) this.userImage = "assets/img/default_user.png"
        else  this.userImage=`${SERVER_URL}adv/img/`+s.image_name   
        
         this.userName=s.fullName
      }else{
       
        this.userName=""
        this.userImage = "assets/img/default_user.png"
       
      }

    }

}
