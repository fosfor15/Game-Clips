import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.css' ]
})
export class ButtonComponent {
    @Input() type: string = 'button';
    @Input() text: string = 'click';
    @Input() disabled: boolean = true;
}
