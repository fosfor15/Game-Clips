import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

    public credentials: Record<'email' | 'password', string> = {
        email: '',
        password: ''
    };

    public isAlertVisible: boolean = false;
    public alertMessage: string = '';
    public alertColor: string = '';

    public inSubmit: boolean = false;

    public emailRegexp: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    public passwordRegexp: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


    constructor(
        private authService: Auth
    ) {}


    async submitLogin(): Promise<void> {
        this.inSubmit = this.isAlertVisible = true;
        this.alertMessage = 'Please wait! Your login request is under processing.';
        this.alertColor = 'green';

        try {
            await signInWithEmailAndPassword(
                this.authService,
                this.credentials.email,
                this.credentials.password
            );

            this.alertMessage = 'You have successfully login into the account!';
        }
        catch (error) {
            console.log('Error with authorization: ', error);
            this.alertMessage = 'An unexpected error occurred! Please try again later.';
            this.alertColor = 'red';
            this.inSubmit = false;
        }

        setTimeout(() => {
            this.inSubmit = this.isAlertVisible = false;
        }, 2e3);
    }

    // ToDo:
    // 1. Choose between reactive- and template-driven form approach and implement it

}
