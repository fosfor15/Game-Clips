import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { EmailTaken } from './register/validators/email-taken.validator';

import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        AuthModalComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        AuthModalComponent
    ],
    providers: [
        EmailTaken
    ]
})
export class UserModule {}
