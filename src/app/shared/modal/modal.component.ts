import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.css' ]
})
export class ModalComponent {

    @Input() id: string = '';

    constructor(
        protected modal: ModalService
    ) {}

    closeModal(id: string, keyCode?: string ): void {
        if (!keyCode || keyCode == 'Escape') {
            this.modal.toggleVisible(id);
        }
    }

}
