import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';

describe('TabComponent', () => {
    let component: TabComponent;
    let fixture: ComponentFixture<TabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TabComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have .hidden class', () => {
        const elem1 = fixture.debugElement.query(By.css('.hidden'));
        // console.log('it >> elem1 :>>', elem1);
        // const elem2 = fixture.nativeElement.querySelector('.hidden');
        // console.log('it >> elem2 :>>', elem2);
        // const elem3 = document.querySelector('.hidden');
        // console.log('it >> elem3 :>>', elem3);

        expect(elem1).toBeTruthy();
    });

    it('should not have .hidden class', () => {
        component.active = true;
        fixture.detectChanges();

        const elem = fixture.debugElement.query(By.css('.hidden'));
        // expect(elem).toBeFalsy();
        expect(elem).not.toBeTruthy();
    });
});
