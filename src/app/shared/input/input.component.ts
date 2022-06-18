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
    @Input() placeholder: string = '';
    @Input() mask: { format: string, prefix: string } = {
        format: '',
        prefix: ''
    };

    label: string = '';

    ngOnInit() {
        this.label = this.name.replace(/-/g, ' ');

        if (!this.placeholder) {
            this.placeholder = `Enter ${ this.name } ${ !this.required ? '(optional)' : '' }`;
        }
    }

}
