import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/tokenStorage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(
    private tokenStorage: TokenStorageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.isUserLoggedIn) {
      this.tokenStorage.signOut();
    } else {
      this.route.navigate(["home"]);
    }
  }
}
