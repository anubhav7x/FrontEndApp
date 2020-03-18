import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { FeaturesComponent } from './features';
import { LoginComponent } from './login';
import { LandingPageComponent } from './landingpage';
import { ProfileComponent } from './profile';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { LearningPathComponent } from './learningpath';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'features',
        component: FeaturesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'courses',
        component: LandingPageComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'learningpath/:id',
        component: LearningPathComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
