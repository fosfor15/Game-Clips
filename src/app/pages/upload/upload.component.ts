import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '@angular/fire/auth';
import { serverTimestamp, Timestamp } from '@angular/fire/firestore';
import { Storage, UploadTask, fromTask, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

import { v4 as uuid } from 'uuid';

import ClipsService from 'src/app/services/clips.service';
import IClip from 'src/app/models/clip.model';


@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {

    public isDragover: boolean = false;
    private file: File | null = null;
    public fileSelected: boolean = false;

    private readonly ALLOWED_FILE_EXT: string = 'video/mp4';
    private readonly MAX_FILE_SIZE: number = 26214400;

    public isAlertVisible: boolean = false;
    public alertColor: string = 'blue';
    public alertMessage: string = 'Please wait! You clip is being uploaded.';

    public inSubmit: boolean = false;
    public showProgress: boolean = false;
    public progress: number = 0;
    private clipTask?: UploadTask;


    constructor(
        private router: Router,
        private authService: Auth,
        private storageService: Storage,
        private clipsService: ClipsService
    ) {}

    ngOnDestroy(): void {
        this.clipTask?.cancel();
    }


    public uploadForm: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ])
    });

    public get titleControl(): FormControl {
        return this.uploadForm.controls['title'] as FormControl;
    }

    public storeFile(event: Event): void {
        this.isDragover = false;
        this.file = (event as DragEvent).dataTransfer?.files.item(0) || null;

        if (this.file?.type != this.ALLOWED_FILE_EXT) {
            this.showAlertMessage('The format of the file must be MP4', 'red', 5e3);
            return;
        }

        if (this.file?.size >= this.MAX_FILE_SIZE) {
            this.showAlertMessage('The size of the file must be no more than 25 Mb', 'red', 5e3);
            return;
        }

        this.isAlertVisible &&= false;
        this.fileSelected = true;
        this.titleControl.setValue(this.file?.name.replace(/\.[^/.]+$/, ''));
    }

    public uploadFile(): void {
        const clipFileName = uuid();
        const clipPath = `clips/${clipFileName}.mp4`;
        const clipRef = ref(this.storageService, clipPath);

        this.clipTask = uploadBytesResumable(clipRef, this.file as File);

        this.showAlertMessage('Please wait! You clip is being uploaded.', 'blue');

        this.uploadForm.disable();
        this.inSubmit = this.showProgress = true;
        this.progress = 0;

        fromTask(this.clipTask).subscribe({
            next: snapshot => {
                this.progress = snapshot.bytesTransferred / snapshot.totalBytes;
            },
            error: error => {
                console.log('Error with uploading the file: ', error);
                this.showAlertMessage('Upload failed! Please try again later.', 'red');
                this.uploadForm.enable();
                this.inSubmit = this.showProgress = false;
            },
            complete: async () => {
                const clip: IClip = {
                    uid: this.authService.currentUser?.uid as string,
                    userName: this.authService.currentUser?.displayName as string,
                    title: this.titleControl.value,
                    fileName: `${clipFileName}.mp4`,
                    clipUrl: await getDownloadURL(clipRef),
                    timestamp: serverTimestamp() as Timestamp
                };

                const clipDoc = await this.clipsService.createClip(clip);

                setTimeout(() => {
                    this.router.navigate([ 'clip', clipDoc['id'] ]);
                }, 1.5e3);

                this.showAlertMessage('Success! You clip is now ready to share with the world.', 'green');
                this.showProgress = false;
            }
        });
    }

    private showAlertMessage(message: string, color: string, timeout: number = 0): void {
        this.isAlertVisible ||= true;
        this.alertMessage = message;
        this.alertColor = color;

        if (timeout) {
            setTimeout(() => {
                this.isAlertVisible = false;
            }, timeout);
        }
    }

}
