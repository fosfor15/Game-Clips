import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    const mockedAuthService = jasmine.createSpyObj(
        'AuthService',
        ['createUser', 'logout'],
        { authState$: of(true) }
    );

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ AppRoutingModule ],
            declarations: [ HeaderComponent ],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockedAuthService
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should logout works', () => {
        const logoutLinkElem = fixture.debugElement.query(By.css('a[autotest="logout-link"]'));
        console.log('it >> logoutLinkElem :>>', logoutLinkElem);
        expect(logoutLinkElem).withContext('not logged in').toBeTruthy();

        logoutLinkElem.triggerEventHandler('click', new Event('click'));
        const authService = TestBed.inject(AuthService);
        expect(authService.logout).withContext('could not click logout link').toHaveBeenCalled();
    });
});
