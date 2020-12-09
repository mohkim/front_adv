import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/login/Authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  activated=false;
  token=""
  errorMessage=""
    constructor(private  auth:AuthenticationService,
                private  route:ActivatedRoute ) { }
    
    
  
    ngOnInit(): void {
      
     this.token=this.route.snapshot.params['token'] 
     console.log("token = "+this.token)
     this.checkForActivation();
    }
    checkForActivation() {
      this.auth.activate(this.token).subscribe(
        data => {
           this.activated=true;
           console.log("activated = "+this.activated)
        
        },
        err => {
          this.activated=false;
          this.errorMessage = err.error.message;
          console.log("activated = "+this.activated)
        }
      );
    }
  
  }