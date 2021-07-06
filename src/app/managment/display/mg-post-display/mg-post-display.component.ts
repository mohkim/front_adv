import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
 

import { Router, ActivatedRoute } from '@angular/router';
 
import { Post } from 'src/app/modules/Post';
import { ManagmentPostService } from 'src/app/service/post/Manag_post.service';
 
import { GlobalConstants } from 'src/app/utility/global-constants';

const AUTH_API = GlobalConstants.serverUrl+'adv/';

@Component({
  selector: 'app-mg-post-display',
  templateUrl: './mg-post-display.component.html',
  styleUrls: ['./mg-post-display.component.css'],
})

export class MgPostDisplayComponent implements OnInit {
  slideIndex = 0
  length:number
  imagePath = ""
  post: Post
  pid: number

  form;
  error_description_required:boolean=true
  
  error_message:String=""
  constructor(
    private postService: ManagmentPostService,
    private route: Router,
    private router: ActivatedRoute
  ) {

  }

 async ngOnInit(){
    this.router.queryParams.subscribe(
      result => {
        this.pid = result.pid
        // console.log("post id=>" + this.pid)
      }, error => {
        this.route.navigate(['/error'])
      }

    )
    this.form = new FormGroup({
      decision: new FormControl('1'),
      error_description: new FormControl(''),
     })

    this.getSource(this.pid)
   
  }
  async getSource(pid:number) {
    const p = await this.postService.getPostByUserId(pid).toPromise();
    if (p != null) {
      this.post = p;
  
       } else {

      this.route.navigate(['error']);
    }

    // set display setting
    this.length = this.post.postImage.length
    // console.log("post id=>" + JSON.stringify(this.post.postImage.length))

    this.showSlides();
  }



  // Next/previous controls
  preveousSlides() {
    if (this.slideIndex == 0) this.slideIndex = this.length - 1
    else this.slideIndex--
    // console.log("previeous  slide ==>" + this.slideIndex)
    this.showSlides();
  }
  nextSlides() {
    // console.log("next  slide ==>" + this.slideIndex)
    if (this.slideIndex >= (this.length - 1)) this.slideIndex = 0
    else this.slideIndex++
    this.showSlides();
  }
  getIndex_lenth(){
    return  (this.slideIndex+1)+"/"+(this.length)
  }
  displayPrice() {
    if (this.post.post_payment.option === 'PRICE') {
      return '' + this.post.post_payment.price_amount  +" "+ this.post.post_payment.price_currency.shortName ;
    } else if (this.post.post_payment.option === 'CONTACT') {
      return 'CONTACT';
    } else if (this.post.post_payment.option === 'COMMISSION') {
      return 'COMMISSION';
    } else if (this.post.post_payment.option === 'RANGE') {
      return '' + this.post.post_payment.min + '-' + this.post.post_payment.max  +" "+ this.post.post_payment.range_currency.shortName;
    }
  }
  showSlides() {
 
    this.imagePath = `${AUTH_API}img/`+ this.post.postImage[this.slideIndex].name
  }
  getUserImage(){
        var  s=this.post.user.image_name
        if(s === undefined)     return "assets/img/default_user.png"
          else   return `${AUTH_API}img/`+s   
    }

    submitForm(){
      console.log("form value ==>"+JSON.stringify(this.form.value))
      if(this.form.value.decision=="1"){
       
      this.postService.aceptPost(this.post.id).subscribe(
        result=> {
          // console.log("accept ==>"+JSON.stringify(result))
          this.getSource(this.post.id)
        },error=>{
          // console.log("accept ==>"+JSON.stringify(error))
        }  )
      this.route.navigate(['/managment/post'])
    
      } else  {
        // console.log("reject ")
    
        this.postService.rejectErrorPost(this.post.id,this.form.value.error_description).subscribe(
          result=> {
            // console.log("accept ==>"+JSON.stringify(result))
            this.getSource(this.post.id)
          },error=>{
            // console.log("accept ==>"+JSON.stringify(error))
          })
    
        this.route.navigate(['/managment/post'])
      }
      
    }
      // error_description_required
  decisionChange(){
    //  console.log("radio button changed !!!!" +JSON.stringify(this.form.value.decision))
      if(this.form.value.decision==="1") {
        this.error_description_required=true
         
         this.form.patchValue({  error_description: ""  })
      }
      else {
        this.error_description_required=false
        this.form.patchValue({  error_description: "" })
      } 
    }
}
