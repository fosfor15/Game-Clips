import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css' ]
})
export class HeaderComponent {

    constructor(
        private modal: ModalService
    ) {}

    openModal(event: Event): void {
        event.preventDefault();
        this.modal.toggleVisible('auth');
    }

}
