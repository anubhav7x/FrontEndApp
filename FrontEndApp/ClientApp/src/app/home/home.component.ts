import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User, Features } from 'src/app/_models';
import { Title } from '@angular/platform-browser';
import { UserService, AuthenticationService } from 'src/app/_services';
import { Observable, from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  currentUser: User;
  users: User[] = [];
  courses: any[] = [];
  topCourses: any[] = [];
  features: any[] = [];
  randomFeatures: any = [];
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private titleService: Title
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.titleService.setTitle('Home');
    this.http.get(`${environment.apiUrl}/api/courses`).subscribe(
      coursesData => {
        this.courses = coursesData as object[];
        this.topCourses = _.sampleSize(this.courses, 3);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
    this.http.get(`${environment.apiUrl}/api/features`).subscribe(
      featuresData => {
        this.features = featuresData as object[];
        this.features = convertToArray(this.features);
        function convertToArray(obj) {
          if (obj.FeatureList instanceof Array) {
              return obj.FeatureList;
          } else {
              return [obj.FeatureList];
          }
        }
        this.randomFeatures = _.sampleSize(this.features, 3);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
