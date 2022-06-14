import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* Feature modules */
import { UserModule } from './user/user.module';

/* Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        UserModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
