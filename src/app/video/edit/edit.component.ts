import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import ClipsService from 'src/app/services/clips.service';

import IClip from 'src/app/models/clip.model';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent {

    @Input({ required: true }) set clip(clip: IClip | null) {
        this._clip = clip;

        if (clip) {
            this.editForm.setValue({
                id: clip.docId,
                title: clip.title
            });

            this.inSubmit = this.isAlertVisible = false;
        }
    };

    get clip(): IClip | null {
        return this._clip;
    }

    private _clip: IClip | null = null;

    @Output() update: EventEmitter<IClip> = new EventEmitter();

    public editForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        title: new FormControl('', [ Validators.required, Validators.minLength(3) ])
    });

    public get titleControl(): FormControl {
        return this.editForm.controls['title'] as FormControl;
    }

    public isAlertVisible: boolean = false;
    public alertColor: string = 'blue';
    private readonly ALERT_DEFAULT_MESSAGE = 'Please wait! You clip is being updated.';
    public alertMessage: string = this.ALERT_DEFAULT_MESSAGE;

    public inSubmit: boolean = false;


    constructor(
        private clipsService: ClipsService
    ) {}


    public async saveClip(): Promise<void> {
        this.inSubmit = this.isAlertVisible = true;
        this.alertColor = 'blue';
        this.alertMessage = this.ALERT_DEFAULT_MESSAGE;

        try {
            await this.clipsService.updateClip(
                this.editForm.controls['id'].value,
                this.titleControl.value
            );
        } catch (error) {
            console.log('Error with updating the clip: ', error);
            this.inSubmit = false;
            this.alertColor = 'red';
            this.alertMessage = 'Something went wrong! Try again later.';
            return;
        }

        this.inSubmit = false;
        this.alertColor = 'green';
        this.alertMessage = 'Success!';

        const updatedClip: IClip = {
            ...this.clip as IClip,
            docId: this.editForm.controls['id'].value,
            title: this.titleControl.value
        };
        this.update.emit(updatedClip);
    }

}
