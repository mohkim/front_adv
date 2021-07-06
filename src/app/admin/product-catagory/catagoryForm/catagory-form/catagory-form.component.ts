import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
import { FormGroup } from '@angular/forms';
import { ProductCatagory } from 'src/app/modules/ProductCatagory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';
import { GlobalConstants } from 'src/app/utility/global-constants';
const AUTH_API = GlobalConstants.serverUrl+'adv/';
@Component({
  selector: 'app-catagory-form',
  templateUrl: './catagory-form.component.html',
  styleUrls: ['./catagory-form.component.css']
})
export class CatagoryFormComponent implements OnInit {
  public catForm: FormGroup;

  @Input() chooseLabel = 'Upload Image'
  @Input() deleteButtonLabel
  @Input() deleteButtonIcon = 'close'
  @ViewChild('fileUpload') fileUpload: ElementRef
 
  url
  inputFileName:File
 

  
 constructor( 
  public dialogRef: MatDialogRef<CatagoryFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: ProductCatagory,
  private snackbar: MatSnackBar,
  public  catService:CatagoyrService) {}

  ngOnInit(): void {
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click()
  }

  onInput(event) { }

  onFileSelected(event) {
    if(this.data.id <=0){
      this.openSnackBar("Catagory id is Empty !!!","error")
      return ;
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }

      //  this.inputFileName = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      this.catService.saveCatagoryImage(event.target.files[0],this.data.id).subscribe(
        result =>{
          this.openSnackBar("Uplode Done ","Message")
        },
        error => {
          this.openSnackBar("Upload Fail","Error")
        }
      )
      this.catService.getProductCatagoryById(this.data.id).subscribe(
        result =>{
          this.data=result
        },
        error => {
          this.openSnackBar("updating data failled","Error")
        }
      )
    
    }
  }
  getImageUrl(img:String){
    return  AUTH_API+"img/"+img;
  }
  openSnackBar( message,type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}