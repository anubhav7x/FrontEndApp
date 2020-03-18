import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({ templateUrl: 'features.component.html' })
export class FeaturesComponent implements OnInit {
    loading = false;
    features: any[] = [];

    constructor(
        private titleService: Title,
        private http: HttpClient
        ) { }

    ngOnInit() {
        this.loading = true;
        this.titleService.setTitle('Features');
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
            },
            (err: HttpErrorResponse) => {
                console.log(err.message);
            }
        );
    }
}
