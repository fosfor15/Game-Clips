import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
    credentials: Record<'email' | 'password', string> = {
        email: '',
        password: ''
    };

    isAlertVisible: boolean = false;
    alertMessage: string = '';
    alertColor: string = '';

    emailRegexp: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    passwordRegexp: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    submitLogin(loginForm: NgForm): void {
        console.log('Registration data :>> ',
            JSON.stringify(this.credentials, null, 4));
        loginForm.reset();

        this.isAlertVisible = true;
        this.alertMessage = 'Please wait! Your login request is under processing.';
        this.alertColor = 'green';

        setTimeout(() => {
            this.isAlertVisible = false;
        }, 3e3);
    }

    // ToDo:
    // 1. Choose between reactive- and template-driven form approach and implement it

}
