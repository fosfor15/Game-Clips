import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


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
        HeaderComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: []
})
export class AppModule {}
