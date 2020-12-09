import { Component, OnInit, Input, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


 

import { CurrencyService } from 'src/app/service/currency/currency.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from 'src/app/service/post/post.service';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/modules/Post';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPostYesNoDialogComponent } from './edit-post-yes-no-dialog/edit-post-yes-no-dialog.component';
import { PostImage } from 'src/app/modules/PostImage';
 
 
 

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  @Input() chooseLabel = 'Add Image'
  @Input() deleteButtonLabel
  @Input() deleteButtonIcon = 'close'
  @ViewChild('fileUpload') fileUpload: ElementRef
  imageSrc = []
  image_old = []
  inputFileName: string

  @Input() files: File[] = []
  images: String[] = []

  public catagorys;
 
 
  public currency1;
  isLinear = false;
  post: Post
  postForm
   postid




  constructor(private fb: FormBuilder,
    private catServive: CatagoyrService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar,
    private currencyService: CurrencyService,
    private sanitizer: DomSanitizer,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute) { }




async  ngOnInit() {
   
  this.postForm=  this.fb.group({
    description: [''],
    specification: [''],
    productSubCatagory: [],
    detail: [''],
     price:  ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
     currency: [],
     inputFileName: [''] 
    
    
  }); 
   
  this.postid=this.route.snapshot.params['id']
  // console.log(" id =>"+this.postid)
    const c = await this.catServive.getallProductCatagory().toPromise();
    if (c != null) this.catagorys = c
    else console.log("  catagorys retrieve failed!!! ")
 
    const cur = await this.currencyService.getallCurrency().toPromise()
    if (cur != null) this.currency1 = cur
    else console.log("  currency retrieve failed!!! ")
   
    const p = await this.postService.getPostById(this.postid).toPromise()
    if (p != null) this.post = p
    else {
      console.log("  Post  retrieve failed!!! ")
     this.router.navigate(['error'])
    }
      this.setValues() 
    this.image_old=this.post.postImage
  
  }
   


  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click()
  }

  onInput(event) { }

  onFileSelected(event) {

    let files1 = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    // console.log('event::::::', event)
    // console.log("1- files size == >"+this.files.length +" files size == >"+this.imageSrc.length)
    // console.log("1- files size == >"+this.files[0].size)
    for (let i = 0; i < files1.length; i++) {
      let file = files1[i];

     console.log("file extention = >"+file.type)
      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files1[i])));
        //      }
        if (!this.isMultiple()) {
          this.files = []
        }
         if(files1[i].size <=2000000){

         
         if( (files1[i].type==='image/jpeg')||(files1[i].type==='image/png') ){
              this.files.push(files1[i]);
        //  }
      }
    }
  }
      //}
    }
    this.imageSrc.splice(0, this.imageSrc.length)
    for (let i = 0; i < this.files.length; i++) {
      // test
      if(files1[i].size <=2000000){
      if( (files1[i].type==='image/jpeg')||(files1[i].type==='image/png') ){
    
      var reader = new FileReader();

      reader.readAsDataURL(this.files[i]);

      reader.onload = (event) => { // called once readAsDataURL is completed

        this.imageSrc[i] = event.target.result;

      }
    }
        
  }
    }
    // console.log("2- files size == >"+this.files.length +" image files size == >"+this.imageSrc.length)
  }

  removeFile(event, file) {
    let ix
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.imageSrc.splice(ix, 1)
      this.files.splice(ix, 1)
      this.clearInputElement()
    }
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size ===f.size
        && f.type ===f.type
      ) {
        return false
      }
    }
    return true
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
  }


  isMultiple(): boolean {
    return true
  }

  async submitPost() {
    var image_number=this.image_old.length+this.files.length
       console.log("old images = >"+this.image_old.length)
       console.log("new images = >"+this.files.length)
    if (image_number == 0) {
      this.openSnackBar("You have to upload atleaset one image !!!", "Error")
    } else if (image_number > 9) {
      this.openSnackBar("Maximum Image allowed is 9 images ", "Error")
    }   else {
    // console.log("Post data For send =>"+JSON.stringify(this.postForm.value))
    const p = await this.postService.editPost(this.postForm.value,this.postid).toPromise()

    if (p) {
      this.postService.savePostImages(p, this.files).subscribe(
        result => {

        },
        error => {
          console.log(error.error.message)
        }

      );
    } else {

    }

    this.router.navigate(['user/post'])
  }
  }
  get productSubCatagory() {
    return this.postForm.get('productSubCatagory')
  }
  get description() {
    return this.postForm.get('description')
  }
  get specification() {
    return this.postForm.get('specification')
  }
  get detail() {
    return this.postForm.get('detail')
  }
  get price() {
    return this.postForm.get('price')
  }
  get currency() {
    return this.postForm.get('currency')
  }
  get inputFileName1() {
    return this.postForm.get('inputFileName')
  }
  setValues(){
    
   this.postForm.patchValue({
      description:this.post.description,
      // specification:this.post.specification,
      detail:this.post.detail,
      //  productSubCatagory: this.catagorys[i].productSubCatagory[y],
      // currency: this.currency1[0],
      // price:this.post.price,
      })
      console.log(" a -5")
     
      var i=0
      var y=0
      var z=0
      for(i=0;i<this.catagorys.length;i++){
        
        // if(this.catagorys[i].productSubcatagory)
        for(y=0;y<this.catagorys[i].productSubcatagory.length;y++){
          
         if(this.catagorys[i].productSubcatagory[y].id ===this.post.productSubCatagory.id) {
          this.postForm.patchValue({
            productSubCatagory: this.catagorys[i].productSubcatagory[y]
          })
           
         
          break;
         }
         
    //      for(z=0;z<this.currency1.length;z++){
    //       if(this.currency1[z].id ===this.post.currency.id) {
    //         this.postForm.patchValue({
    //           currency: this.currency1[z]
    //         })
    //      }
         
      
    // }
  } 
      
      
  }
 
}
 deleteOldImage(name){

if(this.deleteDialog(name)){
console.log("success of delit ")
}

}
showProperty(){
  console.log("post data = >"+JSON.stringify(this.post))
  console.log("Image data = >"+JSON.stringify(this.image_old))
}
 

 
   async deleteDialog(image:PostImage) {
  const dialogRef = this.dialog.open(EditPostYesNoDialogComponent, {
    width: '300px',
    data:  image,
  });

  dialogRef.afterClosed().subscribe(result => {

     this.deletePosImageAction(result)

     
  }, error=>{
 
    this.openSnackBar("Image Deleted fail!!!","Error")
  }
  
  );
}
openSnackBar( message,type) {
  this.snackbar.open(message, type, {
    duration: 2000,
  });
}
 async deletePosImageAction(image:PostImage){
  const  i=await this.postService.deleteImage(this.postid,image.name).toPromise()
  
  if(i){
  const  y=await  this.postService.getPostImages(this.postid).toPromise()
  if(y)  this.image_old=y
  this.openSnackBar("Image Deleted !!!","Message")
}
}

onCatagoryChange(ev){
  console.log("cat vallue  ==>" + JSON.stringify(ev.value.description))
this.openSnackBar("Please update specification","Message")
 this.postForm.patchValue({
  specification: ev.value.description
})
}
}

