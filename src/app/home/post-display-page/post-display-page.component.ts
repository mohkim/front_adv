import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-display-page',
  templateUrl: './post-display-page.component.html',
  styleUrls: ['./post-display-page.component.css']
})
export class PostDisplayPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  members: {title: string, subtitle: string, content: string, url: string}[] = [
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  ];
}
