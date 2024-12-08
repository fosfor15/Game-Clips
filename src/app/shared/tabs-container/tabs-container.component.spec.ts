import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared.module';
import { By } from '@angular/platform-browser';
import { TabsContainerComponent } from './tabs-container.component';

@Component({
    template: `
        <app-tabs-container>
            <app-tab tab-title="Tab 1">Hi!</app-tab>
            <app-tab tab-title="Tab 2">Hey!</app-tab>
        </app-tabs-container>
    `,
    standalone: true,
    imports: [ SharedModule ]
})
class TestComponent {}

describe('TabsContainerComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ TestComponent, SharedModule ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have two tabs', () => {
        const tabs = fixture.debugElement.queryAll(By.css('ul a'));
        // console.log('it >> tabs :>>', tabs);
        expect(tabs.length).withContext('Tabs did not render').toBe(2);

        const containerComponent = fixture.debugElement.query(By.directive(TabsContainerComponent));
        const tabsProp = containerComponent.componentInstance.tabs;
        // console.log('it >> tabsProp :>>', tabsProp);
        expect(tabsProp.length).withContext('Could not grab component property').toBe(2);
    });
});
