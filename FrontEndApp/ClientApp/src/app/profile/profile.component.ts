import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models';
import { UserService, AuthenticationService } from 'src/app/_services';
import { Title } from '@angular/platform-browser';

@Component({ templateUrl: 'profile.component.html' })
export class ProfileComponent implements OnInit {
    loading = false;
    currentUser: User;
    users: User[] = [];

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private titleService: Title) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        this.titleService.setTitle('Edit Profile');
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }
}
