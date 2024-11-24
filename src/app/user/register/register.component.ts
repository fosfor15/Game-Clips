import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { match } from './validators/match.validator';
import { EmailTaken } from './validators/email-taken.validator';

import IUser from 'src/app/models/user.model';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

    public isAlertVisible: boolean = false;
    public alertMessage: string = '';
    public alertColor: string = '';
    public inSubmit: boolean = false;
    private passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    registerForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ], this.emailTaken.validate),
        age: new FormControl(0, [
            Validators.min(18),
            Validators.max(120)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(this.passwordRegexp)
        ]),
        confirmPassword: new FormControl('',
            Validators.required
        ),
        phone: new FormControl('')
    }, match('password', 'confirmPassword'));

    constructor(
        private authService: AuthService,
        private emailTaken: EmailTaken
    ) {}

    public async submitRegistration() {
        const { confirmPassword, ...userData } = this.registerForm.value;

        this.inSubmit = this.isAlertVisible = true;
        this.alertMessage = 'Please wait! Your account registration request is under processing.';
        this.alertColor = 'green';

        try {
            await this.authService.createUser(userData as IUser);
            this.alertMessage = 'Success! Your account has been created.';
        }
        catch (error) {
            console.log(error);
            this.inSubmit = false;
            this.alertMessage = 'An unexpected error occurred! Please try again later.';
            this.alertColor = 'red';
        }

        setTimeout(() => {
            this.registerForm.reset();
            this.inSubmit = this.isAlertVisible = false;
            this.alertMessage = this.alertColor = '';
        }, 2e3);
    }

    // ToDo:
    // 1. Matching and validating feature for password and confirmPassword inputs ✅
    // 2. Feature for moving from Register to Login tab after ngSubmit fires

    // ? Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value for 'ng-pristine': 'true'. Current value: 'false'. Find more at https://angular.io/errors/NG0100

}
