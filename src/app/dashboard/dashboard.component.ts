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
  sunday_date: string;
  monday_date: string;
  tuesday_date: string;
  wednesday_date: string;
  thursday_date: string;
  friday_date: string;
  saturday_date: string;

  sunday = Array();
  monday = Array();
  tuesday = Array();
  wednesday = Array();
  thursday = Array();
  friday = Array();
  saturday = Array();

  authenticated: boolean;
  public events = Array();
  private curr = new Date();

  constructor (private http: Http) {
    if (localStorage.getItem('Usertoken')) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }

    this.getDays();

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
          this.checkDayOfTheWeek(temp);
          console.log(temp);
       }
     });
    //.map(res => res.toString()).subscribe(data => console.log (data));
    console.log("Done");
  }

  checkDayOfTheWeek(event: Events): void{
      const [date, time] = event.Start.split('T');
      const [end_date, end_time] = event.End.split('T');
      event.Start = time;
      event.End = end_time;
      const [year,month,day] = date.split('-');
      var string_month = this.getMonth(month);

      console.log(string_month);

      //stringday + " " + day + " " + month + " " + year
      const [sun_string_day, sun_day, sun_month, sun_year] = this.sunday_date.split(" ");
      if (string_month == sun_month 
        && year == sun_year
        && day == sun_day ) {
          console.log("equal");
          console.log(sun_month);
          console.log("sunday");
          this.sunday = this.sunday.concat(event);
          
      }
      const [mon_string_day, mon_day, mon_month, mon_year] = this.monday_date.split(" ");
      if (string_month == mon_month 
        && year == mon_year
        && day == mon_day ) {
          console.log("equal");
          console.log(mon_month);
          console.log("monday");
          this.monday = this.monday.concat(event);
      }
      const [tue_string_day, tue_day, tue_month, tue_year] = this.tuesday_date.split(" ");
      if (string_month == tue_month 
        && year == tue_year
        && day == tue_day ) {
          console.log("equal");
          console.log(tue_month);
          console.log("tuesday");
          this.tuesday = this.tuesday.concat(event);
          console.log(this.tuesday.length);
      }
      const [wed_string_day, wed_day, wed_month, wed_year] = this.wednesday_date.split(" ");
      if (string_month == wed_month 
        && year == wed_year
        && day == wed_day ) {
          console.log("equal");
          console.log(wed_month);
          console.log("wednesday");
          this.wednesday = this.wednesday.concat(event);
      }
      const [thu_string_day, thu_day, thu_month, thu_year] = this.thursday_date.split(" ");
      if (string_month == thu_month 
        && year == thu_year
        && day == thu_day ) {
          console.log("equal");
          console.log(thu_month);
          console.log("thursday");
          this.thursday = this.thursday.concat(event);
      }
      const [fri_string_day, fri_day, fri_month, fri_year] = this.friday_date.split(" ");
      if (string_month == fri_month 
        && year == fri_year
        && day == fri_day ) {
          console.log("equal");
          console.log(fri_month);
          console.log("friday");
          this.friday = this.friday.concat(event);
      }
      const [sat_string_day, sat_day, sat_month, sat_year] = this.saturday_date.split(" ");
      if (string_month == sat_month 
        && year == sat_year
        && day == sat_day ) {
          console.log("equal");
          console.log(sat_month);
          console.log("saturday");
          this.saturday = this.saturday.concat(event);
      }
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

  prev() {
    let day = this.curr.getDay();
    console.log(this.curr.getTime() - 60 * 60 * 24 * day * 1000)

    let previous_week = (this.curr.getTime() + 60 * 60 *24 * 7 * 1000) - (this.curr.getTime() - 60 * 60 * 24 * day * 1000)
    console.log(previous_week);
    console.log((this.curr.getTime() + 60 * 60 *24 * day * 1000) - previous_week);
    let new_week = ((this.curr.getTime() + 60 * 60 *24 * day * 1000) - previous_week);
    this.curr = new Date((this.curr.getTime() + 60 * 60 *24 * 7 * 1000) - previous_week);
    localStorage.setItem("time", new_week.toString());
    location.reload();
  }

  next() {
    let day = this.curr.getDay();
    console.log((this.curr.getTime() + 60 * 60 *24 * 7 * 1000));
    let new_week = ((this.curr.getTime() + 60 * 60 *24 * 7 * 1000));
    this.curr = new Date((this.curr.getTime() + 60 * 60 *24 * 7 * 1000));
    localStorage.setItem("time", new_week.toString());
    location.reload();
  }

  getDays() {
    if (localStorage.getItem("time")) {
      let temp = parseInt(localStorage.getItem("time"));
      this.curr = new Date(temp);
    }
    
    //curr.setDate(30);
    var day = this.curr.getDay();
    var first = new Date(this.curr.getTime() - 60 * 60 * 24 * day * 1000); //will return firstday (ie sunday) of the week
    console.log("Today: " + this.curr.getDate());
    console.log("Day of the week: " + this.curr.getDay());
    console.log("first day of the week date: ");
    console.log(first);
    for (var i = 0; i < 7; i++) {
      var tmp = new Date(this.curr.getTime() + 60 * 60 *24 * i * 1000); //adding (60*60*6*24*1000) means adding six days to the firstday which results in lastday (saturday) of the week
      console.log(tmp.getDay());

      const [stringday, day, month, year, time, timezone] = tmp.toUTCString().split(' ');
      var date = (stringday + " " + day + " " + month + " " + year)
      switch (stringday) {
        case 'Mon,':
          this.monday_date = date;
          break;
        case 'Tue,':
          this.tuesday_date = date;
          break;
        case 'Wed,':
          this.wednesday_date = date;
          break;
        case 'Thu,':
          this.thursday_date = date;
          break;
        case 'Fri,':
          this.friday_date = date;
          break;
        case 'Sat,':
          this.saturday_date = date;
          break;
        case 'Sun,':
          this.sunday_date = date;
          break;
        default:
      }

      //console.log("DATE: " + testdate.toUTCString());
      //const [stringday, day, month, year, time, timezone] = testdate.toUTCString().split(' ');
      //console.log(stringday + " " + day + " " + month + " " + year)
      //console.log("DAY " + (first + i) + " :" + testdate)
      //console.log("DAY OF WEEK: " + testdate.getDay());
    }
    this.logWeek()
  }

  logWeek() {
    console.log(this.monday_date)
    console.log(this.tuesday_date)
    console.log(this.wednesday_date)
    console.log(this.thursday_date)
    console.log(this.friday_date)
    console.log(this.saturday_date)
    console.log(this.sunday_date)
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