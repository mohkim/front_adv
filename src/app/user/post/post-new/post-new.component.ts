import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { } from '@angular/forms';

import { LocationService } from 'src/app/service/location/Sales_location.service';

import { CurrencyService } from 'src/app/service/currency/currency.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from 'src/app/service/post/post.service';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductSubCatagory } from 'src/app/modules/ProductSubCatagory';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { } from '@angular/core';
import { SpecificationHead } from 'src/app/modules/SpecificationHead';
import { async } from '@angular/core/testing';
import { Post } from 'src/app/modules/Post';
import { TokenStorageService } from 'src/app/service/tokenStorage/token-storage.service';
import { PostPayment } from 'src/app/modules/PostPayment';
import { PostSpecification } from 'src/app/modules/PostSpecification';
import { JsonpClientBackend } from '@angular/common/http';
import { Post_status } from 'src/app/modules/Post_status';
import { UserPostService } from 'src/app/service/post/User_post.service';
import { PostRecipt } from 'src/app/modules/PostRecipt';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
})
export class PostNewComponent implements OnInit {
  form: FormGroup;
  payLoad = '';

  // old code
  @Input() chooseLabel = 'Add Image';
  @Input() deleteButtonLabel;
  @Input() deleteButtonIcon = 'close';

  @ViewChild('fileUpload') fileUpload: ElementRef;
  imageSrc = [];
  inputFileName: string;

  @Input() files: File[] = [];
  images: String[] = [];

  public catagorys;
  public salesLocation;
  public currency1;
  public selectSubCat: ProductSubCatagory;
  public isSubCatSelected: boolean = false;
  public maximum_number_img: number;

  postForm;
  paymentform;
  packageform;
  uploadFileCount: number = 0;
  //
  post: Post
  paymentObj: PostPayment
  serviceFee:PostRecipt
  postSpecifcation = [];
  //
  price_readonly = true
  price_required = false
  negotiable_readonly = true
  min_readonly = true
  min_required = false
  max_readonly = true
  max_required = false

  async submitPost() {
//     this.formToObject()
//  console.log("payment object==>"+JSON.stringify(this.serviceFee))
    if (this.files.length < this.selectSubCat.img_min) {
      this.openSnackBar('upload atleast ' + this.selectSubCat.img_min + ' images', 'Error');
    } else {
      console.log('Post data For send =>' + JSON.stringify(this.post));
      this.formToObject()  // preppare post
      const p = await this.postService
        .savePost(this.post)
        .toPromise();

      if (p) {
        this.postService.savePostImages(p, this.files).subscribe(
          (result) => { },
          (error) => {
            console.log(error.error.message);
          }
        );
      } else {
      }

      this.router.navigate(['user/post']);
    }
  }

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private catServive: CatagoyrService,
    private salesLocationService: LocationService,
    private currencyService: CurrencyService,
    private sanitizer: DomSanitizer,
    private postService: UserPostService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.post = new Post(-1,"",null,null,null,"",null,null,null,null,null,null)
    this.paymentObj = new PostPayment(-1, "PRICE", false, 0,null, 0, 0,null)
    this.serviceFee=new  PostRecipt(-1,"FREE","",0)

    this.isSubCatSelected = false;

    this.form = new FormGroup({}); // = this.qcs.toFormGroup(this.questions);
    this.paymentform = new FormGroup({
      payment_option: new FormControl(''),
      negotiable: new FormControl(false),
      price_amount: new FormControl(),
      price_currency: new FormControl(),
      min: new FormControl(''),
      max: new FormControl(''),
      range_currency: new FormControl(''),
    });
    this.postForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      productSubCatagory: new FormControl(),
      detail: new FormControl(''),
      inputFileName: new FormControl(''),
      salesLocation: new FormControl(''),
      // specification: this.form,
      post_payment: this.paymentform,
      package_fee: new FormControl("")
    });

    this.getSourceData();
  }

  async getSourceData() {
    const c = await this.catServive.getallProductCatagory().toPromise();
    if (c != null) this.catagorys = c;
    else console.log('  catagorys retrieve failed!!! ');

    const s = await this.salesLocationService.getallSalesLocation().toPromise();
    if (c != null) this.salesLocation = s;
    else console.log('  Sales Location retrieve failed!!! ');

    const cur = await this.currencyService.getallCurrency().toPromise()
    if (cur != null) this.currency1 = cur
    else console.log("  currency retrieve failed!!! ")

   
  }

  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onInput(event) { }

  async onFileSelected(event) {
    var img_width
    let files1 = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    // console.log('event::::::', event)
    // console.log("1- files size == >"+this.files.length +" files size == >"+this.imageSrc.length)
    // console.log("1- files size == >"+this.files[0].size)


    for (let i = 0; i < files1.length; i++) {
      let file = files1[i];


      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files1[i])
        );
        //      }
        // if (!this.isMultiple()) {
        //   this.files = [];
        // }
        if (files1[i].size <= 5000000) {  // check the size
          if (files1[i].type === 'image/jpeg' || files1[i].type === 'image/png') { // image type
            if (this.files.length < this.selectSubCat.img_max) { //check number of image 
              const imgWidth = await this.getImageWidths(files1[i]);
              // console.log("return  result ==> "+imgWidth)
              if (imgWidth > 799) {
                this.files.push(files1[i]);

              } else {
                this.openSnackBar("image width should be atleast 800px", "message")
                continue
              }



            } else {
              this.openSnackBar("Maximum " + this.selectSubCat.img_max + " images are allowed", "message")
              break
            }

            //  }
          } else {
            this.openSnackBar("image format should be *.jpeg,*.png", "message")

          }
        }else {
          this.openSnackBar("too big image size !!!", "message")

        }
      }
      //}
    }
    // console.log("size == >"+files1.length)
    this.imageSrc.splice(0, this.imageSrc.length);
    var num
    if (this.files.length > this.selectSubCat.img_max) num = this.selectSubCat.img_max
    else num = this.files.length
    for (let i = 0; i < num; i++) {
      // test
      if (this.files[i].size <= 2000000) {
        if (this.files[i].type === 'image/jpeg' || this.files[i].type === 'image/png') {
          var reader = new FileReader();

          reader.readAsDataURL(this.files[i]);

          reader.onload = (event) => {
            // called once readAsDataURL is completed

            this.imageSrc[i] = event.target.result;
          };
        }
      }
    }
    // console.log("2- files size == >"+this.files.length +" image files size == >"+this.imageSrc.length)
  }

  removeFile(event, file) {
    let ix;
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.imageSrc.splice(ix, 1);
      this.files.splice(ix, 1);
      this.clearInputElement();
    }
  }

  validate(file: File) {
    for (const f of this.files) {
      if (
        file.size > 5000000
        //f.name === file.name
        //  && f.lastModified === file.lastModified &&
        //  f.size >5000000
        // && ((f.type === 'jpg')||f.type === 'jpg')
      ) {
        return false;
      }
    }
    return true;
  }

  getImageWidths(file) {



    return new Promise<number>((resolve, reject) => {

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          resolve(width)
        };
      };
    })
  }
  clearInputElement() {
    this.fileUpload.nativeElement.value = '';
  }

  isMultiple(): boolean {
    return true;
  }


  get productSubCatagory() {
    return this.postForm.get('productSubCatagory');
  }
  get description() {
    return this.postForm.get('description');
  }
  // get specification() {
  //   return this.postForm.get('specification')
  // }
  get detail() {
    return this.postForm.get('detail');
  }
  // get price() {
  //   return this.postForm.get('price')
  // }
  // get currency() {
  //   return this.postForm.get('currency')
  // }
  get inputFileName1() {
    return this.postForm.get('inputFileName');
  }
  openSnackBar(message, type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
  onCatagoryChange(ev) {
    if (ev.value) {
      this.selectSubCat = ev.value;
      // console.log(
      //   'form = >' + JSON.stringify(this.selectSubCat)
      // );
      // update  the form
      let group = {};
      this.selectSubCat.specificationList.forEach((specification) => {
        // group[specification.key] = new FormControl('');
        group[specification.key] = specification.required ? new FormControl(specification.value || '', Validators.required)
          : new FormControl(specification.value || '');
      });

      this.postForm.removeControl('specification')
      this.postForm.addControl('specification', new FormGroup(group))

      this.postForm.patchValue({
        post_payment: {
          negotiable: false,
          price_amount: "",
          min: "",
          max: "",
          price_currency:"",
          range_currency:""
        }
      })
      // end of  update form specification list
      this.isSubCatSelected = true; // make catagory slected true
    } else {
      this.isSubCatSelected = false;
    }
  }
  payment_required() {
    if (this.selectSubCat.commision === false &&
      this.selectSubCat.contact === false &&
      this.selectSubCat.price === false &&
      this.selectSubCat.range === false) {
      return false
    } else return true
  }
  fee_required() {
    if (this.selectSubCat.fee_free_enable === false &&
      this.selectSubCat.fee_week_enable === false &&
      this.selectSubCat.fee_month_enable === false &&
      this.selectSubCat.fee_year_enable === false) {
      return false
    } else return true
  }
  public formToObject() {


    this.post.productSubCatagory = this.selectSubCat
    this.post.description = this.postForm.value.description
    this.post.salesLocation = this.postForm.value.salesLocation
    this.post.detail = this.postForm.value.detail
   this.post.post_status = this.getPostStatus()
   this.post.view=0
   
    // payment option  
    this.post.post_payment = this.getPostPayment()

    this.post.specificationList = this.getPostSpecification()
    this.post.post_receipt=this.getServiceFee()

    return this.post;
  }

  paymentOnChange() {
    //  console.log("radio button changed to ==>"+JSON.stringify(this.postForm.value.post_payment))

    if (this.postForm.value.post_payment.payment_option === "PRICE") {
      this.price_readonly = false
      this.price_required = true
      this.negotiable_readonly = false
      this.min_readonly = true
      this.min_required = false
      this.max_readonly = true
      this.max_required = false
      this.postForm.patchValue({
        post_payment: {
          // negotiable:false,
          // price_amount:"",
          min: "",
          max: ""
        }
      })

    } else if (this.postForm.value.post_payment.payment_option === "RANGE") {
      this.postForm.patchValue({
        post_payment: {
          negotiable: false,
          price_amount: "",
          // min:"",
          // max:""
        }
      })

      this.price_readonly = true
      this.price_required = false
      this.negotiable_readonly = true
      this.min_readonly = false
      this.min_required = true
      this.max_readonly = false
      this.max_required = true
    } else {
      this.postForm.patchValue({
        post_payment: {
          negotiable: false,
          price_amount: "",
          min: "",
          max: "",
          price_currency:"",
        }
      })

      this.price_readonly = true
      this.price_required = false
      this.negotiable_readonly = true
      this.min_readonly = true
      this.min_required = false
      this.max_readonly = true
      this.max_required = false
    }
  }

  getPostPayment() {
     
    this.paymentObj.option = this.postForm.value.post_payment.payment_option
    this.paymentObj.price_amount = this.postForm.value.post_payment.price_amount
    this.paymentObj.min = this.postForm.value.post_payment.min
    this.paymentObj.max = this.postForm.value.post_payment.max
    this.paymentObj.negotiable = this.postForm.value.post_payment.negotiable
    this.paymentObj.price_currency=this.postForm.value.post_payment.price_currency
    this.paymentObj.range_currency=this.postForm.value.post_payment.price_currency

    return this.paymentObj
  }
  getServiceFee(){
    // this.serviceFee.feeOption=this.postForm.value.package_fee
    var  index=this.postForm.value.package_fee
    if(index=="1")   {
      this.serviceFee.feeOption='FREE'
      this.serviceFee.amount=this.selectSubCat.fee_free
    } 
    else if(index=="2"){
      this.serviceFee.feeOption='WEEK'
      this.serviceFee.amount=this.selectSubCat.fee_week
    }  
    else if(index=="3")  {
      this.serviceFee.feeOption='MONTH'
      this.serviceFee.amount=this.selectSubCat.fee_month
    }
    else if(index=="4")  {
      this.serviceFee.feeOption='YEAR'
      this.serviceFee.amount=this.selectSubCat.fee_year
    }


    return this.serviceFee
    
    
  }

  getPostSpecification() {
    this.postSpecifcation.splice(0, this.postSpecifcation.length)
    console.log("length of array =>" + this.selectSubCat.specificationList.length)
    for (let index = 0; index < this.selectSubCat.specificationList.length; index++) {

      // console.log("index = "+index+" data => "+ JSON.stringify(
      //   this.postForm.value.specification[this.selectSubCat.specificationList[index].key]
      // ))


      this.postSpecifcation.push(new PostSpecification(null,
        this.selectSubCat.specificationList[index],
        this.postForm.value.specification[this.selectSubCat.specificationList[index].key]))

    }
    return this.postSpecifcation

  }
  getPostStatus(){
    return  new Post_status(-1,"PENDING",null,null,null,null,null,null,null)
  }

}
