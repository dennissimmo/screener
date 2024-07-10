import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private _auth: AuthService,
        private _router: Router
    ) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._auth.getToken();
        const headers = request.headers.has('Content-Type') ? request.headers.get('Content-Type') : 'application/json';
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': headers || '',
                }
            });
        }
        return next.handle(request).pipe(
            catchError(x=> this.handleAuthError(x))
        );
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            //navigate /delete cookies or whatever
            this._router.navigateByUrl(`/token`);
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }
}