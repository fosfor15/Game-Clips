import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ManageComponent } from './pages/manage/manage.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ClipComponent } from './pages/clip/clip.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        UserModule,
        provideFirebaseApp(() => initializeApp({
            /* ... */
        })),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        AboutComponent,
        ManageComponent,
        UploadComponent,
        ClipComponent,
        NotFoundComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: []
})
export class AppModule {}
