import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { Auth, fetchSignInMethodsForEmail } from '@angular/fire/auth';


@Injectable()
export class EmailTaken implements AsyncValidator {

    private validationTimeoutId: ReturnType<typeof setTimeout> | null = null;

    constructor(
        private authService: Auth
    ) {}

    validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return this.validateWithDelay(control.value)
            .then(response => response.length ? { emailTaken: true } : null);
    };

    validateWithDelay(value: string): Promise<string[]> {
        return new Promise(resolve => {
            const localTimeoutId = this.validationTimeoutId = setTimeout(() => {
                if (localTimeoutId == this.validationTimeoutId) {
                    fetchSignInMethodsForEmail(this.authService, value).then(resolve);
                    this.validationTimeoutId = null;
                } else {
                    resolve([]);
                }
            }, 1000);
        })
    }
}
