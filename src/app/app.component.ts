import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {

    public renderAuthModal: boolean = false;
    private authServiceSub!: Subscription;

    constructor(
        protected readonly authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authServiceSub = this.authService.authState$
            .subscribe(state => {
                if (state) {
                    setTimeout(() => {
                        this.renderAuthModal = false;
                    }, 2e3);
                } else {
                    this.renderAuthModal = true;
                }
            });
    }

    ngOnDestroy(): void {
        this.authServiceSub.unsubscribe();
    }

}
