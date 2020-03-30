import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { UserService, AuthenticationService } from 'src/app/_services';
import { Observable, from, config } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { OrderPipe } from 'ngx-order-pipe';

@Component({ templateUrl: 'landingpage.component.html' })
export class LandingPageComponent {

  loading = false;
  currentUser: User;
  users: User[] = [];
  courses: any[] = [];
  page = 1;
  totalPages: number;
  isDesc = false;
  column: any;
  selectedSortOrder = 'Sort by';
  order: string = 'id';
  reverse: boolean = false;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private titleService: Title,
    private config: NgbPaginationConfig,
    private orderPipe: OrderPipe
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    config.size = 'sm';
    config.pageSize = 4;
  }

  ngOnInit() {
    this.loading = true;
    this.titleService.setTitle('Courses Catalog');
    this.http.get(`${environment.apiUrl}/api/courses`).subscribe(
      data => {
        this.courses = data as object[];
        this.totalPages = Math.round(this.courses.length / this.config.pageSize);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    this.courses = this.orderPipe.transform(this.courses, value);
  }
}
