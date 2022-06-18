import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: [ './alert.component.css' ]
})
export class AlertComponent {
    @Input('bg-color') bgColor: string = '';

    get bgClass(): string {
        switch (this.bgColor) {
            case 'red':
                return 'bg-red-400';

            case 'green':
                return 'bg-green-500';

            case 'blue':
            default:
                return 'bg-blue-400';
        }
    }

    // ToDo:
    // 1. Closing feature by button press
    // 2. Service for opening and auto closing

}
