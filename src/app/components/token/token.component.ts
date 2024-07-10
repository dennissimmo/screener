import { Component } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {
  token = '';

  constructor(
      private _auth: AuthService,
      private _router: Router
  ) {
  }

  updateToken() {
    if (this.token) {
      this._auth.storeToken(this.token);
      this._router.navigateByUrl('/dashboard');
    }
  }
}
