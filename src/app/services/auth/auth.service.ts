import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { IAuthResponse } from "../../models/api.model";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";

const TOKEN = "AUTH_TOKEN";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {}

    init(): void {
        const token = this.getToken();
        if (!token) {
            this.authenticate().subscribe(response => {
                const accessToken = response.access_token;
                this.storeToken(accessToken);
                this._router.navigateByUrl('/dashboard');
            });
        }
    }
    getToken(): string {
        return localStorage.getItem(TOKEN) || '';
    }

    storeToken(token: string): void {
        this.resetToken();
        localStorage.setItem(TOKEN, token);
    }

    resetToken(): void {
        localStorage.removeItem(TOKEN);
    }

    authenticate(): Observable<IAuthResponse> {
        const params = new HttpParams()
                .set('grant_type','password')
                .set('client_id', environment.keyCloakClientId)
                .set('username', environment.apiUsername)
                .set('password', environment.apiPassword);
        return this._http.post<IAuthResponse>(
            `identity/realms/${environment.keyCloakRealm}/protocol/openid-connect/token`,
            params.toString(),
            {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
        )
            .pipe(
                tap(res => this.storeToken(res.access_token))
            );
    }
}