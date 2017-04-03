import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Events } from '../event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  authenticated: boolean;
  public events = Array();
  private date;

  constructor (private http: Http) {
    if (localStorage.getItem('Usertoken')) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }

    this.buildarray();

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //let concat = "Bearer " + localStorage.getItem("Usertoken");
    //console.log(concat);
    //headers.append('Authorization', concat);

    this.http.get(
      "http://zenithsocietycore.azurewebsites.net/api/EventsApi",
      {headers: headers}
    ).map(res => res.json())
     .subscribe(data => {
       console.log(data);
       for (var i = 0; i < data.length; i++) {
          var temp = new Events();
          temp.ActivityId = data[i].activity.description;
          temp.CreatedBy = data[i].createdBy;
          temp.CreationDate = data[i].creationDate;
          temp.End = data[i].end;
          temp.EventId = data[i].eventId;
          temp.IsActive = data[i].isActive;
          temp.Start = data[i].start;

          this.events = this.events.concat(temp);
          console.log(temp);

          //this.events = this.events.concat("eventID",data[i].eventId);
          //console.log(data[i].eventId);
       }
       //this.events.concat(data);
     });
    //.map(res => res.toString()).subscribe(data => console.log (data));
    console.log("Done");
  }

  printEvents(): void {
    console.log(this.events);
    //for (let e of this.events) {
      //console.log(e.ActivityId);
    //}
  }

  printToken(): void {
    console.log(localStorage.getItem("Usertoken"));
    console.log(localStorage.getItem("Username"));
    //console.log(this.token);
  }

  ngOnInit() {
  }

  getMonth(month): string {
    switch(month) {
      case '01':
        return "Jan";
      case '02':
        return "Feb";
      case '03':
        return "Mar";
      case '04':
        return "Apr";
      case '05':
        return "May";
      case '06':
        return "Jun";
      case '07':
        return "Jul";
      case '08':
        return "Aug";
      case '09':
        return "Sep";
      case '10':
        return "Oct";
      case '11':
        return "Nov";
      case '12':
        return "Dec";
      default:
    }
  }


  buildarray() {
    
    var week = Array()

    var curr = new Date; // get current date
    curr.setDate(14);
    var first = curr.getDate() - curr.getDay();
    console.log("today: " + curr.getDate() + " day of the week: " + curr.getDay());
    console.log("first day of the week date: " + first)

    for (var i = 0; i < 7; i++) {
      var test = first + i;
      var testdate = new Date(curr.setDate(test));

      console.log("DAY " + (first + i) + " :" + testdate)
      console.log("DAY OF WEEK: " + testdate.getDay());
    }

/*
    var last = first + 6;


    var firstday = new Date(curr.setDate(first)).toUTCString();
    console.log("FIRSTDAY:" + firstday)
    var lastday = new Date(curr.setDate(last)).toUTCString();
    console.log("LASTDAY:" + lastday)

    var testdate = "2017-03-26T03:20:02";
    const [stuff1, stuff2] = testdate.split('T');
    console.log(stuff1);
    console.log(stuff2)
    const [year, month, day] = stuff1.split('-');
    console.log(year);
    console.log(this.getMonth(month));
    console.log(day);
*/


  }

}

/*
Http Response

activity:Object
	activityId:2
	creationDate:"2017-01-02T00:00:00"
	description:"Intro to CSS 3"
	events:Array(1)
		0:Object
			activityId:2
			createdBy:"maks"
			creationDate:"2017-01-04T00:00:00"
			end:"2017-03-30T08:30:00"
			eventId:3
			isActive:true
			start:"2017-03-30T06:30:00"
			__proto__:Object
		length:1
		__proto__:Array(0)
	__proto__:Object
activityId:2
createdBy:"maks"
creationDate:"2017-03-26T03:20:02"
end:"2017-03-26T09:30:00"
eventId:6
isActive:true
start:"2017-03-26T08:30:00"
*/