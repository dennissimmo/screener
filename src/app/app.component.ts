import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'screener';

  constructor(
      private _auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this._auth.init();
  }
}
