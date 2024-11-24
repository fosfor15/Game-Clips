import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function match(controlName: string, matchingControlName: string): ValidatorFn  {
    return (form: AbstractControl): ValidationErrors | null => {
        const passwordControl = form.get(controlName);
        const matchingPasswordControl = form.get(matchingControlName);

        if (!passwordControl || !matchingPasswordControl) {
            console.log(`Matching controls ${controlName} and ${matchingControlName} are not found`);
            return { controlNotFound: true };
        }

        if (passwordControl.value == matchingPasswordControl.value) {
            matchingPasswordControl.setErrors(null);
            return null;
        }

        const error = { noMatch: true };
        matchingPasswordControl.setErrors(error);

        return error;
    }
}
