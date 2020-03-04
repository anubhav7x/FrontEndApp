import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { UserService, AuthenticationService } from 'src/app/_services';
import { Observable, from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({ templateUrl: 'landingpage.component.html' })
export class LandingPageComponent {
  loading = false;
  currentUser: User;
  users: User[] = [];
  courses: any[] = [];
  private readonly jsonURL = 'assets/Catalog_DataSet_V1.json';
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
    this.titleService.setTitle('Courses Catalog');
    this.http.get(this.jsonURL).subscribe(
      data => {
        this.courses = data as object[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
