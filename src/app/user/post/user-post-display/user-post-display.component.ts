import { Component, OnInit, OnDestroy } from '@angular/core';
 

import { Router, ActivatedRoute } from '@angular/router';
 
import { Post } from 'src/app/modules/Post';
 
import { UserPostService } from 'src/app/service/post/User_post.service';
 

@Component({
  selector: 'app-user-post-display',
  templateUrl: './user-post-display.component.html',
  styleUrls: ['./user-post-display.component.css']
})

export class UserPostDisplayComponent implements OnInit {
   slideIndex = 0
  length:number
  imagePath = ""
  post: Post
  pid: number
  constructor(private postService: UserPostService,
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
    this.getSource()

  }
  async getSource() {
    const p = await this.postService.getPostByIdOfUser(this.pid).toPromise()
    if (p) { this.post = p }
    else this.route.navigate(['/error'])

    // set display setting
    this.length = this.post.postImage.length
    console.log("post id=>" + JSON.stringify(this.post.postImage.length))

    this.showSlides();
  }



  // Next/previous controls
  preveousSlides() {
    if (this.slideIndex == 0) this.slideIndex = this.length - 1
    else this.slideIndex--
    console.log("previeous  slide ==>" + this.slideIndex)
    this.showSlides();
  }
  nextSlides() {
    console.log("next  slide ==>" + this.slideIndex)
    if (this.slideIndex >= (this.length - 1)) this.slideIndex = 0
    else this.slideIndex++
    this.showSlides();
  }
  getIndex_lenth(){
    return  (this.slideIndex+1)+"/"+(this.length)
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
  showSlides() {
    this.imagePath = "http://localhost:8080/adv/img/" + this.post.postImage[this.slideIndex].name
  }

  

}
