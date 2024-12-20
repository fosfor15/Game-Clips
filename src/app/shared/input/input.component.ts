import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: [ './input.component.css' ]
})
export class InputComponent implements OnInit {

    @Input() name: string = '';
    @Input() type: string = 'text';
    @Input() control: FormControl = new FormControl('');
    @Input() required: boolean = false;
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() mask: { format: string, prefix: string } = {
        format: '',
        prefix: ''
    };

    ngOnInit() {
        if (!this.label) {
            this.label = this.name
                .replace(/-/g, ' ')
                .replace(/^\w/, firstLetter => firstLetter.toUpperCase());
        }

        if (!this.placeholder) {
            this.placeholder = `Enter ${ this.name } ${ !this.required ? '(optional)' : '' }`;
        }
    }

    // ToDo:
    // 1. Universal input component for Login and Register forms
    // 2. Event handler of phone number input for reset its value to pristine and empty string, in purpose of remove mask prefix +7
    // 3. Errors and recommendations messaging when change or blur events fires

}
