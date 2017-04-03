import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authenticated: boolean;
  username: string;
  title = 'Zenith';

  constructor() {
    if (localStorage.getItem('Usertoken')) {
      this.authenticated = true;
      this.username = localStorage.getItem('Username');
    }
  }

  logout() {
    localStorage.removeItem('Usertoken');
    localStorage.removeItem('time');
    this.authenticated = false;
    location.reload();
  }
}
