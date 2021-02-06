import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';
import { PostImageDialogComponent } from 'src/app/common/post/post-image-dialog/post-image-dialog.component';
import { AdminPostService } from 'src/app/service/post/Admin_post.service';
import { UserPostService } from 'src/app/service/post/User_post.service';
 

@Component({
  selector: 'app-user-post-display',
  templateUrl: './user-post-display.component.html',
  styleUrls: ['./user-post-display.component.css']
})
export class UserPostDisplayComponent implements OnInit {
  post;
  mainPicture_url = '';
  loopsize;
  progress = 0;
  postid: number;
  timer;
  error_description_required:boolean=false
  submit_button_enable:boolean=false 
  display_error_message:boolean=false
  display_disable_form:boolean=false
  error_message:String=""
  post_disable:boolean
  form;
  constructor(
    public dialog: MatDialog,
    private postService: UserPostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.postid=                params['pid']

    this.route.queryParams.subscribe(
      (result) => {
        console.log('pid ==>' + JSON.stringify(result.pid));
        this.postid = result.pid;
      },
      (error) => {
        console.log('pid ==>' + JSON.stringify(error));
      }
    );

    this.getSource(this.postid);
   
    


  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
  async getSource(pid: number) {
    const p = await this.postService.getPostByIdOfUser(pid).toPromise();
    if (p != null) {
      this.post = p;
      if(p.post_status.status==='ERROR') {
        this.display_error_message=true
        this.display_disable_form=false
        this.error_message=p.post_status.rejectionReason
      }  else if(p.post_status.status==='ACTIVE'){
        this.display_error_message=false
        this.display_disable_form=true
        this.error_message=""
        this.post_disable=false
      }
      else if(p.post_status.status==='PENDING'){
        this.display_error_message=false
        this.display_disable_form=false
        this.error_message=""
      } else if(p.post_status.status==='DISABLED'){
        this.display_error_message=false
        this.display_disable_form=true
        this.error_message=""
        this.post_disable=true
      }  
      /// enable disable post  display
      

    } else {

      this.router.navigate(['error']);
    }

    this.loop();
  }
  loop() {
    this.mainPicture_url = this.post.postImage[0].url;
    this.loopsize = this.post.postImage.length;
    // console.log("post loop size=> " + this.loopsize)
    this.timer = setInterval(() => {
      // console.log("progress=> " + this.progress)
      this.progress = this.progress + 1;
      this.progress = this.progress % this.loopsize;
      this.mainPicture_url = this.post.postImage[this.progress].url;
    }, 3000);
  }
  onClick(id: number) {}
  imageClick(id: number) {
    this.openDialog(this.post.postImage[id].url);
  }
  imageClick2() {
    this.openDialog(this.mainPicture_url);
  }

  openDialog(image_url: String): void {
    const dialogRef = this.dialog.open(PostImageDialogComponent, {
      width: 'auto',

      data: { image: image_url },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  displayPrice() {
    if (this.post.post_payment.option === 'PRICE') {
      return '' + this.post.post_payment.price_amount + " "+this.post.post_payment.price_currency.shortName;
    } else if (this.post.post_payment.option === 'CONTACT') {
      return 'CONTACT';
    } else if (this.post.post_payment.option === 'COMMISSION') {
      return 'COMMISSION';
    } else if (this.post.post_payment.option === 'RANGE') {
      return '' + this.post.post_payment.min+ " "+this.post.post_payment.price_currency.shortName + '-' + this.post.post_payment.max+ " "+this.post.post_payment.price_currency.shortName;
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

  submitForm(){

  //   console.log("Check box value ==>"+this.post_disable)
 
   
  // this.postService.enableDisalbePost(this.post.id,this.post_disable).subscribe(
  //   result=> {
  //     console.log("accept ==>"+JSON.stringify(result))
  //     this.getSource(this.post.id)
  //   },error=>{
  //     console.log("accept ==>"+JSON.stringify(error))
  //   }  )
  // this.router.navigate(['/admin/post'])
 
  
}
}
