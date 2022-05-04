import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {NotificationService} from '../service/notifocation/notification.service';
import {Role} from '../model/role';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(() => {
      this.notificationService.showMessage('success', 'Đăng nhập thành công!');
      this.router.navigate(['/product/list']);
    }, error => {
      this.notificationService.showMessage('error', 'Đăng nhập lỗi!');
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
