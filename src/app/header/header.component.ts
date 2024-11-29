import { Component } from '@angular/core';


import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { IsActiveMatchOptions } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css' ]
})
export class HeaderComponent {

    public activeLinkOptions: IsActiveMatchOptions = {
        matrixParams: 'ignored',
        queryParams: 'ignored',
        paths: 'subset',
        fragment: 'ignored'
    };

    public defaultSortTypeParam = { sort: '1' };

    constructor(
        private modal: ModalService,
        protected readonly authService: AuthService
    ) {}

    openModal(event: Event) {
        event.preventDefault();
        this.modal.toggleVisible('auth');
    }

    async logOut(event: Event) {
        event.preventDefault();
        await this.authService.logout();
    }

}
