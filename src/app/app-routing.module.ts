import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ManageComponent } from './pages/manage/manage.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ClipComponent } from './pages/clip/clip.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'manage',
        component: ManageComponent,
        canActivate: [ AuthGuard ],
        data: {
            authRequired: true,
            authGuardPipe: redirectUnauthorizedToHome
        }
    },
    {
        path: 'manage-clips',
        redirectTo: 'manage'
    },
    {
        path: 'upload',
        component: UploadComponent,
        canActivate: [ AuthGuard ],
        data: {
            authRequired: true,
            authGuardPipe: redirectUnauthorizedToHome
        }
    },
    {
        path: 'clip/:id',
        component: ClipComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
