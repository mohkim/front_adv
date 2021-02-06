import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators

} from '@angular/forms';

import { } from '@angular/forms';
import { LocationService } from 'src/app/service/location/Sales_location.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CatagoyrService } from 'src/app/service/catagory/catagory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductSubCatagory } from 'src/app/modules/ProductSubCatagory';
import { } from '@angular/core';
import { Post } from 'src/app/modules/Post';
import { PostPayment } from 'src/app/modules/PostPayment';
import { PostSpecification } from 'src/app/modules/PostSpecification';
import { Post_status } from 'src/app/modules/Post_status';
import { UserPostService } from 'src/app/service/post/User_post.service';
import { EditPostYesNoDialogComponent } from './edit-post-yes-no-dialog/edit-post-yes-no-dialog.component';
import { PostImage } from 'src/app/modules/PostImage';
import { CurrencyService } from 'src/app/service/currency/currency.service';
import { PostRecipt } from 'src/app/modules/PostRecipt';




@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
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
  public salesLocations;
  public currency1;
  public selectSubCat: ProductSubCatagory;
  public isSubCatSelected: boolean = false;
  public maximum_number_img: number;
  public form_is_editing = true;
  public image_old = []
  postForm;
  paymentform;
  packageform;
  uploadFileCount: number = 0;
  //
  post: Post
  pid: number


  postSpecifcation = [];
  //
  price_readonly = true
  price_required = false
  negotiable_readonly = true
  min_readonly = true
  min_required = false
  max_readonly = true
  max_required = false

  async submitPost1() {
    var img_length = this.files.length + this.image_old.length
    if (img_length < this.selectSubCat.img_min) {
      this.openSnackBar('upload atleast ' + this.selectSubCat.img_min + ' images', 'Error');
    } else if (img_length > this.selectSubCat.img_max) {
      this.openSnackBar('more than' + this.selectSubCat.img_min + ' images is not allowed !!!', 'Error');
    } else {
      console.log('Post data For send =>' + JSON.stringify(this.post));
      this.formToObject()  // preppare post
      const p = await this.postService
        .editPost(this.post, this.pid)
        .toPromise();


      this.postService.savePostImages(this.pid, this.files).subscribe(
        (result) => { },
        (error) => {
          console.log(error.error.message);
        }
      );


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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (result) => {

        this.pid = result.pid;

      },
      (error) => {
        console.log('pid ==>' + JSON.stringify(error));
      }
    );

    this.post = new Post(-1, "", null, null, null, "", null, null, null, null, null, null)


    this.isSubCatSelected = true;

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
      productSubCatagory: new FormControl(''),
      detail: new FormControl(''),
      inputFileName: new FormControl(''),
      salesLocation: new FormControl(),
      // specification: this.form,
      post_payment: this.paymentform,
      package_fee: new FormControl("")
    });

    this.getSourceData();

  }


  async getSourceData() {
    const p = await this.postService.getPostByIdOfUser(this.pid).toPromise();
    if (p != null) {

      this.post = p;
       // console.log("post ==>"+JSON.stringify(this.post))

    } else this.router.navigate(['error']);

    const c = await this.catServive.getallProductCatagory().toPromise();
    if (c != null) this.catagorys = c;
    else console.log('  catagorys retrieve failed!!! ');

    const s = await this.salesLocationService.getallSalesLocation().toPromise();
    if (c != null) this.salesLocations = s;
    else console.log('  Sales Location retrieve failed!!! ');

    const cur = await this.currencyService.getallCurrency().toPromise()
    if (cur != null) this.currency1 = cur
    else console.log("  currency retrieve failed!!! ")
    this.image_old = this.post.postImage

    

    this.objectToForm();
  }

  onClick() {

    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onInput(event) {

  }

  async onFileSelected(event) {

    var img_width
    let files1 = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    // console.log('event::::::', event)
    // console.log("1- files size == >" + this.files.length + " files size == >" + this.imageSrc.length)
    // console.log("1- files size == >" + this.files[0].size)


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
        if (files1[i].size < 50000000) {  // check the size
          console.log("IMAGE SIZE ==>" + JSON.stringify(files1[i].size))
          if (files1[i].type === 'image/jpeg' || files1[i].type === 'image/png' || files1[i].type === 'image/jpg') { // image type
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
        } else {
          this.openSnackBar("image size should be less than 5MB", "message")
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
      if (this.files[i].size < 5000000) {
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

  onCatagoryChange(ev) {
    if (ev.value) {
      this.selectSubCat = ev.value;
      this.form_is_editing = false; // from now  form is changing based on selection not history
      this.changeCatagory()
    } else {
      this.isSubCatSelected = false;
    }
  }
  changeCatagory() {

    // console.log(
    //   'form = >' + JSON.stringify(this.selectSubCat)
    // );
    // update  the form
    let group = {};
    this.selectSubCat.specificationList.forEach((specification) => {

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
        max: ""
      }
    })
    // end of  update form specification list
    this.isSubCatSelected = true; // make catagory slected true
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
    // this.post.post_status = this.getPostStatus()
    this.post.view = 0

    // payment option  
    this.getPostPayment()    // post payment from form to post

    this.post.specificationList = this.getPostSpecification()
    this.getServiceFee()   // set  postServisceFee
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
          max: ""
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
    this.post.post_payment.option = this.postForm.value.post_payment.payment_option
    this.post.post_payment.price_amount = this.postForm.value.post_payment.price_amount
    this.post.post_payment.min = this.postForm.value.post_payment.min
    this.post.post_payment.max = this.postForm.value.post_payment.max
    this.post.post_payment.negotiable = this.postForm.value.post_payment.negotiable
    this.post.post_payment.price_currency = this.postForm.value.post_payment.price_currency
    this.post.post_payment.range_currency = this.postForm.value.post_payment.price_currency


  }

  getPostSpecification() {
    this.postSpecifcation.splice(0, this.postSpecifcation.length)
    // console.log("length of array =>" + this.selectSubCat.specificationList.length)
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

  /**
   */
  async getPostStatus() {

    return new Post_status(-1, "PENDING", null, null, null, null, null, null, null)
  }


  objectToForm() {
    console.log("Object to Form")
    //  console.log("post.subcatagory.productSubCatagory==>"+JSON.stringify(this.post.productSubCatagory))
    //  console.log("post.subcatagory.specificationList==>"+JSON.stringify(this.post.specificationList))
    //  console.log("ProductSubCatagory size "+this.post.productSubCatagory.specificationList.length)
    //  console.log("specificationListsize "+this.post.specificationList.length)
    this.putSepecifiationListToProductionSubcatagory()
    this.setPostDataToForm()
  }
  getServiceFee() {

    var index = this.postForm.value.package_fee
    if (this.post.post_receipt === null) this.post.post_receipt = new PostRecipt(null, "FREE", "", 0)

    if (index == "1") {
      this.post.post_receipt.feeOption = 'FREE'
      this.post.post_receipt.amount = this.selectSubCat.fee_free
    }
    else if (index == "2") {
      this.post.post_receipt.feeOption = 'WEEK'
      this.post.post_receipt.amount = this.selectSubCat.fee_week
    }
    else if (index == "3") {
      this.post.post_receipt.feeOption = 'MONTH'
      this.post.post_receipt.amount = this.selectSubCat.fee_month
    }
    else if (index == "4") {
      this.post.post_receipt.feeOption = 'YEAR'
      this.post.post_receipt.amount = this.selectSubCat.fee_year
    }





  }

  /**
   * sets specificationlist value to  ProductSubCAtagory specification list in order to be 
   * used in creating dynamic form  based on the data that was ginven by user  [ upgrade is needed in the code]
   */
  putSepecifiationListToProductionSubcatagory() {
    var i=0;
    var array_length = this.post.productSubCatagory.specificationList.length //> this.post.specificationList.length ? this.post.productSubCatagory.specificationList.length : this.post.specificationList.length

    for (let index = 0; index < array_length; index++) {
      // console.log(" index = "+ index+" -specifiationlist= "+this.post.specificationList[index].specification.id+" product subcatagory = "+
      // this.post.productSubCatagory.specificationList[index].id     )
    //
    i=this.post.productSubCatagory.specificationList[index].id
 
    this.post.productSubCatagory.specificationList[index].value = (this.post.specificationList.find(x=>x.specification.id===i)).value

    }
    console.log("product subcatagory  ==>" +JSON.stringify(this.post.productSubCatagory.specificationList))
  }

  setPostDataToForm() {
    if (!this.form_is_editing) return
    this.postForm.patchValue({
      description: this.post.description,
      // specification:this.post.specification,
      detail: this.post.detail,
      //  productSubCatagory: this.catagorys[i].productSubCatagory[y],
    })


    var i = 0
    var y = 0
    var z = 0
    var s = 0

    // sales location end

    this.selectSubCat = this.post.productSubCatagory
    this.changeCatagory()


    this.paymentform.patchValue({
      payment_option: this.post.post_payment.option,
      negotiable: this.post.post_payment.negotiable,
      price_amount: this.post.post_payment.price_amount,
      min: this.post.post_payment.min,
      max: this.post.post_payment.max,
    })

    // console.log("Payment option ==>" + this.paymentform.value.payment_option)
    this.paymentOnChange() //  reset  required and other staffs


    // payment  price  currency setting
    for (z = 0; z < this.currency1.length; z++) {
      if (this.currency1[z].id === this.post.post_payment.price_currency.id) {
        this.paymentform.patchValue({
          price_currency: this.currency1[z]
        })
      }

    }

    // range price  currency setting
    for (z = 0; z < this.currency1.length; z++) {
      if (this.currency1[z].id === this.post.post_payment.range_currency.id) {
        this.paymentform.patchValue({
          range_currency: this.currency1[z]
        })
      }

    }

    //  service  fee  option
    if (this.post.post_receipt != null) {
      if (this.post.post_receipt.feeOption === "FREE") { this.postForm.patchValue({ package_fee: "1" }) }
      else if (this.post.post_receipt.feeOption === "WEEK") { this.postForm.patchValue({ package_fee: "2" }) }
      else if (this.post.post_receipt.feeOption === "MONTH") { this.postForm.patchValue({ package_fee: "3" }) }
      else if (this.post.post_receipt.feeOption === "YEAR") { this.postForm.patchValue({ package_fee: "4" }) }

    }
        //sales location start

        for (s = 0; s < this.salesLocations.length; s++) {
          if (this.salesLocations[s].id == this.post.salesLocation.id) {
            this.postForm.patchValue({
              salesLocation: this.salesLocations[s]
            })
          }


        }






    for (i = 0; i < this.catagorys.length; i++) {

      // if(this.catagorys[i].productSubcatagory)
      for (y = 0; y < this.catagorys[i].productSubcatagory.length; y++) {

        if (this.catagorys[i].productSubcatagory[y].id === this.post.productSubCatagory.id) {
          this.postForm.patchValue({
            productSubCatagory: this.catagorys[i].productSubcatagory[y]

          })
        
          break;
        }
           }
              }
                }

  deleteOldImage(name) {

    if (this.deleteDialog(name)) {
      console.log("success of delit ")
    }

  }
  async deleteDialog(image: PostImage) {
    const dialogRef = this.dialog.open(EditPostYesNoDialogComponent, {
      width: '300px',
      data: image,
    });

    dialogRef.afterClosed().subscribe(result => {

      this.deletePostImageAction(result)


    }, error => {

      this.openSnackBar("Image Deleted fail!!!", "Error")
    }

    );
  }

  async deletePostImageAction(image: PostImage) {
    const i = await this.postService.deleteImage(this.pid, image.name).toPromise()
    console.log("i ==>" + JSON.stringify(i))
    if (i) {
      const y = await this.postService.getPostImages(this.pid).toPromise()
      console.log("y ==>" + JSON.stringify(y))
      if (y) this.image_old = y
      this.openSnackBar("Image Deleted !!!", "Message")
    }
  }


  openSnackBar(message, type) {
    this.snackbar.open(message, type, {
      duration: 2000,
    });
  }
}