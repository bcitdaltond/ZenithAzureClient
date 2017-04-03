import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticated: boolean;
  username: string;
  public Username;
  public Password;

  constructor(private http: Http) {
    if (localStorage.getItem('Usertoken')) {
      this.authenticated = true;
      this.username = localStorage.getItem('Username');
    }
   }

  ngOnInit() {
  }

  login(Username:string = null, Password:string = null): void {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let data = 'grant_type=password'+'&username=' + Username +'&password=' + Password;

    this.http.post(
      "http://zenithsocietycore.azurewebsites.net/connect/token",
       data,
       {headers: headers}
    ).map(res => res.json()).subscribe(data => {console.log(data), localStorage.setItem('Usertoken',data.access_token), localStorage.setItem('Username', Username)/*, location.reload()*/});
    //.map(res => res.json()).subscribe(data => { this.token = data.access_token});

    console.log("Recieved Token");
    //location.reload();
  }

  print(): void {
    console.log(localStorage.getItem("Usertoken"));
    console.log(localStorage.getItem("Username"));
    //console.log(this.token);
  }

  logout() {
    localStorage.removeItem('Usertoken');
    this.authenticated = false;
    location.reload();
  }
}
