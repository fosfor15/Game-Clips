import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ClipsListComponent } from './video/clips-list/clips-list.component';
import { ManageComponent } from './pages/manage/manage.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ClipComponent } from './pages/clip/clip.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EditComponent } from './video/edit/edit.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        UserModule,
        SharedModule,
        provideFirebaseApp(() => initializeApp({
            /* ... */
        })),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ClipsListComponent,
        AboutComponent,
        ManageComponent,
        UploadComponent,
        ClipComponent,
        NotFoundComponent,
        EditComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: []
})
export class AppModule {}
