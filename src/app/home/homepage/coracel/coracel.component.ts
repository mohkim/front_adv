import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coracel',
  templateUrl: './coracel.component.html',
  styleUrls: ['./coracel.component.css']
})
export class CoracelComponent implements OnInit {
  slideIndex = 1;
  length=3
  imagePath="assets/img/slider/1.jpg"
  constructor() { }

  ngOnInit(): void {
    this.showSlides();
  }

 


// Next/previous controls
preveousSlides() {
  if(this.slideIndex==1)  this.slideIndex=3
  else this.slideIndex--
  console.log("previeous  slide ==>"+this.slideIndex)
  this.showSlides();
}
nextSlides() {
  console.log("next  slide ==>"+this.slideIndex)
  if(this.slideIndex==3)  this.slideIndex=1
  else this.slideIndex++
  this.showSlides();
}
 
 showSlides() {
      this.imagePath="assets/img/slider/"+this.slideIndex+".jpg"
  }

}
