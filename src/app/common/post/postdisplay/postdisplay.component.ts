import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostImageDialogComponent } from '../post-image-dialog/post-image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/service/post/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postdisplay',
  templateUrl: './postdisplay.component.html',
  styleUrls: ['./postdisplay.component.css']
})
export class PostdisplayComponent implements OnInit,OnDestroy {

    post
   mainPicture_url = ""
  loopsize
  progress = 0
  postid:number
  timer

  constructor(public dialog: MatDialog,
    private postService: PostService,
    private  route:ActivatedRoute) { }



  ngOnInit(): void {
   
this.postid=this.route.snapshot.params['id']
console.log("post id=> " + this.postid) 
     this.getSource(this.postid)
     
    
  } 
  
  ngOnDestroy(): void {
    clearInterval(this.timer);
    
  } 
 async getSource(id:number){
  const p= await   this.postService.getPostById(id).toPromise()
  
    this.post=p
   
  this.loop()

  }
  loop (){
    this.mainPicture_url = this.post.postImage[0].url
    this.loopsize = this.post.postImage.length
    console.log("post loop size=> " + this.loopsize) 
this.timer=  setInterval(() => {
      console.log("progress=> " + this.progress)
      this.progress = this.progress + 1;
      this.progress = this.progress % this.loopsize
      this.mainPicture_url = this.post.postImage[this.progress].url

    }, 3000);
  }
  onClick(id: number) {

  }
  imageClick(id: number) {
    this.openDialog(this.post.postImage[id].url)
  }
  imageClick2() {
    this.openDialog(this.mainPicture_url)
  }

  openDialog(image_url: String): void {
    const dialogRef = this.dialog.open(PostImageDialogComponent, {
      width: 'auto',

      data: { "image": image_url }
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

}