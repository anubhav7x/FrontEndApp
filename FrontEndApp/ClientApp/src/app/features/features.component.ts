import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models';
import { UserService } from 'src/app/_services';
import { Title } from '@angular/platform-browser';

@Component({ templateUrl: 'features.component.html' })
export class FeaturesComponent implements OnInit {
    loading = false;
    users: User[] = [];

    constructor(
        private userService: UserService,
        private titleService: Title) { }

    ngOnInit() {
        this.loading = true;
        this.titleService.setTitle('Features');
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
