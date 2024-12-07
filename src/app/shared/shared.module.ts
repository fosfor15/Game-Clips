import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';

import { EventBlockerDirective } from './directives/event-blocker.directive';
import { FbTimestampPipe } from './pipes/fb-timestamp.pipe';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        InputComponent,
        ButtonComponent,
        AlertComponent,
        ModalComponent,
        TabsContainerComponent,
        TabComponent,
        EventBlockerDirective,
        FbTimestampPipe
    ],
    exports: [
        InputComponent,
        ButtonComponent,
        AlertComponent,
        ModalComponent,
        TabsContainerComponent,
        TabComponent,
        EventBlockerDirective,
        FbTimestampPipe
    ]
})
export class SharedModule { }
