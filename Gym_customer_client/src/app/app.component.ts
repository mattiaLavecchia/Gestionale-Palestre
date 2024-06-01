import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Your Gym';
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.authService.getAuthStatusListener().subscribe(r => {
      this.isAuthenticated = r;
    })
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();

  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

}
