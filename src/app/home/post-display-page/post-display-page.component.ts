import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/modules/Post';
import { PostService } from 'src/app/service/post/post.service';
import { GlobalConstants } from 'src/app/utility/global-constants';

const AUTH_API = GlobalConstants.serverUrl+'adv/';

@Component({
  selector: 'app-post-display-page',
  templateUrl: './post-display-page.component.html',
  styleUrls: ['./post-display-page.component.css']
})
export class PostDisplayPageComponent implements OnInit {

  slideIndex = 0
  length:number
  imagePath = ""
  post: Post
  pid: number
  constructor(private postService: PostService,
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
    const p = await this.postService.getPostById(this.pid).toPromise()
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
    this.imagePath = `${AUTH_API}img/` + this.post.postImage[this.slideIndex].name
  }

  

}
