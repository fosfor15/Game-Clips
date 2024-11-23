import { Component } from '@angular/core';

import { Auth, signOut } from '@angular/fire/auth';

import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css' ]
})
export class HeaderComponent {

    constructor(
        private modal: ModalService,
        private authFBService: Auth,
        protected readonly authService: AuthService
    ) {}

    openModal(event: Event) {
        event.preventDefault();
        this.modal.toggleVisible('auth');
    }

    async logOut(event: Event) {
        event.preventDefault();
        await signOut(this.authFBService);
    }

}
