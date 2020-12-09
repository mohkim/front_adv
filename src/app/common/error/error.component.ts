import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostImageDialogComponent } from '../post/post-image-dialog/post-image-dialog.component';
 
 
 
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  slides:any=[{'image':'assets/img/20200814003442169_1_24_0_.jpg'},
         {'image':'assets/img/20200814003442265_1_24_1_.jpg'},
         {'image':'assets/img/20200814003442298_1_24_2_.jpg'},
         {'image':'assets/img/20200815205445252_1_29_0_.jpg'},
         {'image':'assets/img/20200815205445376_1_29_1_.png'},
         {'image':'assets/img/20200815205445382_1_29_2_.jpg'},
         {'image':'assets/img/20200815205445401_1_29_3_.jpg'},
         {'image':'assets/img/20200815215958663_1_30_0_.jpg'}
        ];
mainPicture_url=""
loopsize
progress=0

  constructor(public dialog: MatDialog) { }



  ngOnInit(): void {
  
  }
   

}