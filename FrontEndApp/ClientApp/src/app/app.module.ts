import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { HeaderComponent } from './_component/_header/header.component';
import { FooterComponent } from './_component/_footer/footer.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { FeaturesComponent } from './features';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { LandingPageComponent } from './landingpage';
import { ProfileComponent } from './profile';
import { AlertComponent } from './_component';
import { LearningPathComponent } from './learningpath';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FeaturesComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        LandingPageComponent,
        ProfileComponent,
        LearningPathComponent,
        AlertComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
