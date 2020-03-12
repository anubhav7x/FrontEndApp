import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { UserService, AuthenticationService } from 'src/app/_services';
import { Observable, from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { LandingPageComponent } from '../landingpage/landingpage.component';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'learningpath.component.html'
})
export class LearningPathComponent {
  loading = false;
  currentUser: User;
  users: User[] = [];
  courses: any[] = [];
  id: number;
  selectedCourse: any;
  sub: any;
  courseName: string;
  courseDescription: string;
  courseDuration: number;
  courseTags: any;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.get(`${environment.apiUrl}/api/courses`).subscribe(
        data => {
          this.courses = data as object[];
          this.courses = this.courses[this.id - 1001];
          this.titleService.setTitle(this.courses['Course'].Name);
          this.courseName = this.courses['Course'].Name;
          this.courseDescription = this.courses['Course'].Description;
          this.courseDuration = this.courses['Course'].Duration;
          this.courseTags = this.courses['Course'].Tags[0].Name;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
    });
  }
}
