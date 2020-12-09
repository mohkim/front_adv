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

import {} from '@angular/forms';

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
import {} from '@angular/core';
import { SpecificationHead } from 'src/app/modules/SpecificationHead';

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

  postForm;
  paymentform;
  packageform;
  uploadFileCount: number = 0;

  onSubmit() {
   // if payment method price slected  validate price 
   //if  payment method  range selected validate  range

    this.payLoad = JSON.stringify(this.postForm.getRawValue());
    // console.log("form data => "+JSON.stringify(this.postForm))
  }
  // old code below

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private catServive: CatagoyrService,
    private salesLocationService: LocationService,
    //private currencyService: CurrencyService,
    private sanitizer: DomSanitizer,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isSubCatSelected = false;

    this.form = new FormGroup({}); // = this.qcs.toFormGroup(this.questions);
    this.paymentform = new FormGroup({
      payment_option: new FormControl(''),
      negotiable: new FormControl(false),
      price_amount: new FormControl( ),
      min: new FormControl(''),
      max: new FormControl(''),
    });
    this.postForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      productSubCatagory: new FormControl( ),
      detail: new FormControl(''),
      //  price: new FormControl(''),
      //  currency: new FormControl(''),
      inputFileName: new FormControl(''),
      salesLocation: new FormControl(''),
     // specification: this.form,
      post_payment: this.paymentform,
      package_fee:new FormControl("")
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

    // const cur = await this.currencyService.getallCurrency().toPromise()
    // if (cur != null) this.currency1 = cur
    // else console.log("  currency retrieve failed!!! ")
  }

  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onInput(event) {}

  onFileSelected(event) {
    let files1 = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    // console.log('event::::::', event)
    // console.log("1- files size == >"+this.files.length +" files size == >"+this.imageSrc.length)
    // console.log("1- files size == >"+this.files[0].size)
    for (let i = 0; i < files1.length; i++) {
      let file = files1[i];

      console.log('file extention = >' + file.type);
      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files1[i])
        );
        //      }
        if (!this.isMultiple()) {
          this.files = [];
        }
        if (files1[i].size <= 2000000) {
          if (
            files1[i].type === 'image/jpeg' ||
            files1[i].type === 'image/png'
          ) {
            this.files.push(files1[i]);
            //  }
          }
        }
      }
      //}
    }
    this.imageSrc.splice(0, this.imageSrc.length);
    for (let i = 0; i < this.files.length; i++) {
      // test
      if (files1[i].size <= 2000000) {
        if (files1[i].type === 'image/jpeg' || files1[i].type === 'image/png') {
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

  clearInputElement() {
    this.fileUpload.nativeElement.value = '';
  }

  isMultiple(): boolean {
    return true;
  }

  async submitPost() {
    if (this.files.length == 0) {
      this.openSnackBar('You have to upload atleaset one image !!!', 'Error');
    } else if (this.files.length > 9) {
      this.openSnackBar('Maximum Image allowed is 9 images ', 'Error');
    } else {
      console.log(
        'Post data For send =>' + JSON.stringify(this.postForm.value)
      );
      const p = await this.postService
        .savePost(this.postForm.value)
        .toPromise();

      if (p) {
        this.postService.savePostImages(p, this.files).subscribe(
          (result) => {},
          (error) => {
            console.log(error.error.message);
          }
        );
      } else {
      }

      this.router.navigate(['user/post']);
    }
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
      console.log(
        'form = >' + JSON.stringify(this.selectSubCat)
      );
      // update  the form
      let group = {};
      this.selectSubCat.specificationList.forEach((specification) => {
        // group[specification.key] = new FormControl('');
        group[specification.key] = specification.required ? new FormControl(specification.value || '', Validators.required)
                                              : new FormControl(specification.value || '');
      });
      
     this.postForm.removeControl('specification')
     this.postForm.addControl('specification',new FormGroup(group))

      // end of  update form specification list
      this.isSubCatSelected = true; // make catagory slected true
    } else {
      this.isSubCatSelected = false;
    }
  }
    payment_required(){
      if(this.selectSubCat.commision===false&&
        this.selectSubCat.contact===false&&
        this.selectSubCat.price===false&&
        this.selectSubCat.range===false) {
          return  false
        }else  return  true
    }
    fee_required(){
      if(this.selectSubCat.fee_free_enable===false&&
        this.selectSubCat.fee_week_enable===false&&
        this.selectSubCat.fee_month_enable===false&&
        this.selectSubCat.fee_year_enable===false) {
          return  false
        }else  return  true
    }
}
