import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';
import { PostImageDialogComponent } from 'src/app/common/post/post-image-dialog/post-image-dialog.component';
import { ManagmentPostService } from 'src/app/service/post/Manag_post.service';

@Component({
  selector: 'app-mg-post-display',
  templateUrl: './mg-post-display.component.html',
  styleUrls: ['./mg-post-display.component.css'],
})

export class MgPostDisplayComponent implements OnInit {
  post;
  mainPicture_url = '';
  loopsize;
  progress = 0;
  postid: number;
  timer;
  error_description_required:boolean=false
  submit_button_enable:boolean=false 
  display_error_message:boolean=false
  display_aprove_form:boolean=false
  error_message:String=""
  form;
  constructor(
    public dialog: MatDialog,
    private postService: ManagmentPostService,
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
   
    this.form = new FormGroup({
      decision: new FormControl(''),
      error_description: new FormControl(''),
    
    })


  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
  async getSource(pid: number) {
    const p = await this.postService.getPostByUserId(pid).toPromise();
    if (p != null) {
      this.post = p;
      if(p.post_status.status==='ERROR') {
        this.display_error_message=true
        this.display_aprove_form=false
        this.error_message=p.post_status.rejectionReason
      }  else if(p.post_status.status==='ACTIVE'){
        this.display_error_message=false
        this.display_aprove_form=false
        this.error_message=""
      }
      else if(p.post_status.status==='PENDING'){
        this.display_error_message=false
        this.display_aprove_form=true
        this.error_message=""
      } 

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
      return '' + this.post.post_payment.price_amount + ' SSP';
    } else if (this.post.post_payment.option === 'CONTACT') {
      return 'CONTACT';
    } else if (this.post.post_payment.option === 'COMMISSION') {
      return 'COMMISSION';
    } else if (this.post.post_payment.option === 'RANGE') {
      return '' + this.post.post_payment.min + '-' + this.post.post_payment.max;
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
  if(this.form.value. decision=="0"){
   
  this.postService.aceptPost(this.post.id).subscribe(
    result=> {
      console.log("accept ==>"+JSON.stringify(result))
      this.getSource(this.post.id)
    },error=>{
      console.log("accept ==>"+JSON.stringify(error))
    }  )
  this.router.navigate(['/managment/post'])

  } else  {
    console.log("reject ")

    this.postService.rejectErrorPost(this.post.id,this.form.value.error_description).subscribe(
      result=> {
        console.log("accept ==>"+JSON.stringify(result))
        this.getSource(this.post.id)
      },error=>{
        console.log("accept ==>"+JSON.stringify(error))
      })

    this.router.navigate(['/managment/post'])
  }
  
}
}
