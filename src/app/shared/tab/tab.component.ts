import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: [ './tab.component.css' ]
})
export class TabComponent {
    @Input('tab-title') title: string = '';
    @Input() active: boolean = false;
}
