import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSubscription: Subscription = new Subscription();
  public isLoading: boolean = false;
  public isLogin: boolean = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.isLoading = true;
    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(r => this.isLoading = false);
  }

  public onLogin(form: NgForm): void {
    if (form.invalid) return;
    if (!this.isLogin) {
      this.onSignUp(form);
    } else {
      const { email, password } = form.value;
      this.isLoading = true;
      this.authService.login(email, password);
    }
  }

  public onSignUp(form: NgForm) {
    const { name, email, password, passwordConfirm } = form.value;
    if (password !== passwordConfirm) {
      form.controls['passwordConfirm'].setErrors({ passwordMismatch: true });
      return;
    }
    this.isLoading = true;
    this.authService.signUp(name, email, password, passwordConfirm);
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
