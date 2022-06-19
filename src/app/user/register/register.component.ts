import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

    isAlertVisible: boolean = false;
    alertMessage: string = '';
    alertColor: string = '';
    private passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    registerForm = new FormGroup({
        name: new FormControl(null, [
            Validators.required,
            Validators.minLength(3)
        ]),

        email: new FormControl(null, [
            Validators.required,
            Validators.email
        ]),

        age: new FormControl(null, [
            Validators.min(18),
            Validators.max(120)
        ]),

        password: new FormControl(null, [
            Validators.required,
            Validators.pattern(this.passwordRegexp)
        ]),
        'confirm-password': new FormControl(null, [
            Validators.required,
            Validators.pattern(this.passwordRegexp)
        ]),

        phone: new FormControl(null)
    });

    submitRegistration() {
        console.log('Registration data :>> ',
            JSON.stringify(this.registerForm.value, null, 4));
        this.registerForm.reset();

        this.isAlertVisible = true;
        this.alertMessage = 'Please wait! Your account registration request is under processing.';
        this.alertColor = 'green';

        setTimeout(() => {
            this.isAlertVisible = false;
        }, 3e3);
    }

    // ToDo:
    // 1. Matching and validating feature for password and confirm-password inputs
    // 2. Event handler of phone number input for reset its value to pristine and empty string, in purpose of remove mask prefix +7
    // 3. Feature for moving from Register to Login tab after ngSubmit fires

    // ? Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value for 'ng-pristine': 'true'. Current value: 'false'. Find more at https://angular.io/errors/NG0100

}
