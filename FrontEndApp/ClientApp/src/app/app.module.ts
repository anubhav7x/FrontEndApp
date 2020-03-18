import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { HeaderComponent } from './_component/_header/header.component';
import { FooterComponent } from './_component/_footer/footer.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { FeaturesComponent } from './features';
import { LoginComponent } from './login';
import { LandingPageComponent } from './landingpage';
import { ProfileComponent } from './profile';
import { AlertComponent } from './_component';
import { LearningPathComponent } from './learningpath';
import { FilterPipe } from './_component/_filter/filter.pipe';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FeaturesComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        LandingPageComponent,
        ProfileComponent,
        LearningPathComponent,
        AlertComponent,
        FilterPipe
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
