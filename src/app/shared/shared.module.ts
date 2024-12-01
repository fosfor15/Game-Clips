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
        TabComponent
    ],
    exports: [
        InputComponent,
        ButtonComponent,
        AlertComponent,
        ModalComponent,
        TabsContainerComponent,
        TabComponent
    ]
})
export class SharedModule { }
