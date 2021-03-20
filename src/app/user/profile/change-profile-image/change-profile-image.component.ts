import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/modules/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.css']
})
export class ChangeProfileImageComponent implements OnInit {
  @Input() chooseLabel = 'Upload Image'
  @Input() deleteButtonLabel
  @Input() deleteButtonIcon = 'close'
  @ViewChild('fileUpload') fileUpload: ElementRef
 
  url
  inputFileName:File
 


  


  constructor(private userService: UserService,
              private router:Router,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
   

    this.getSource()
  }
  async getSource() {
  const s=await   this.userService.getUserImageUrl().toPromise();
 
    if(s != undefined) {
      this.url=s.message
    }else{
      this.url = "assets/img/avatar.png"
      this.openSnackBar("User Image retrieve fail ","Error")
    }
  }

  onSubmit() {

  }
  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click()
  }

  onInput(event) { }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }

      //  this.inputFileName = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      this.userService.saveUserImage(event.target.files[0]).subscribe(
        result =>{
          this.openSnackBar("Uplode Done ","Message")
          location.reload()
           
        },
        error => {
          this.openSnackBar("Upload Fail","Error")
        }
      )
    
    }
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}