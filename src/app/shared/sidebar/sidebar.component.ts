import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'));
  admin?: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    if (this.currentUser != null) {
      this.admin = this.currentUser.username;
    }
  }

  logOut() {
    this.authenticationService.logout();
  }

  ngOnInit() {
  }


}
