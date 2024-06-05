import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, Subject, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { CustomSnackBarComponent } from "../shared/custom-snack-bar/custom-snack-bar.component";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated: boolean = false;
    private token!: string;
    private serverUrl = environment.apiUrl;
    private authStatusListener = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private _snackBar: MatSnackBar
    ) { };

    public getToken(): string {
        return this.token;
    }

    public getIsAuth(): boolean {
        return this.isAuthenticated;
    }

    public getAuthStatusListener(): Observable<boolean> {
        return this.authStatusListener.asObservable();
    }

    public login(email: string, password: string): void {
        const authData = { email, password };
        console.log('entro nell login')
        this.http.post<{ token: string, data: {}, }>(`${this.serverUrl}/users/login`, authData).subscribe(r => {
            const token = r.token;
            if (token) {
                this.token = token;
                this.isAuthenticated = true;
                this.saveAuthData(token);
                this.authStatusListener.next(true);
                this.router.navigate([""]);
            };
        }, error => {
            this._snackBar.openFromComponent(CustomSnackBarComponent, {
                duration: 3000,
                data: 'Email o password sbagliata',
            });
            this.authStatusListener.next(false);
        });
    };

    public logout(): void {
        this.http.get(`${this.serverUrl}/users/logout`).subscribe(r => {
            this.token = '';
            this.isAuthenticated = false;
            this.authStatusListener.next(false);
            this.clearAuthData();
            this.router.navigate(["/login"])
        });
    }

    public signUp(name: string, email: string, password: string, passwordConfirm: string): void {
        const authData = { name, email, password, passwordConfirm };
        console.log('entro nell signUp')
        this.http.post<{ token: string, data: {}, }>(`${this.serverUrl}/users/signup`, authData)
            .subscribe(r => {
                const token = r.token;
                if (token) {
                    this.token = token;
                    this.isAuthenticated = true;
                    this.saveAuthData(token);
                    this.authStatusListener.next(true);
                    this.router.navigate([""]);
                };
            }, error => {
                console.error(error.error.message);
                this._snackBar.openFromComponent(CustomSnackBarComponent, {
                    duration: 3000,
                    data: error.error.message,
                });
                this.authStatusListener.next(false);
            });
    };



    public autoAuthUser() {
        const token = this.getTokenData();
        if (!token) return;
        this.token = token
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
    }

    private saveAuthData(token: string): void {
        localStorage.setItem("token", token);
    };

    private clearAuthData(): void {
        localStorage.removeItem("token");
    }

    private getTokenData() {
        const token = localStorage.getItem("token");
        if (!token) return;
        return token;
    }

}
