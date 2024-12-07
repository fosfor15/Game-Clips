import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import videojs from 'video.js';

import IClip from 'src/app/models/clip.model';


@Component({
    selector: 'app-clip',
    templateUrl: './clip.component.html',
    styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {

    @ViewChild('videoPlayer', { static: true }) private videoPlayer!: ElementRef<HTMLVideoElement>;

    public clipId: string = '';
    public clip: IClip | null = null;


    constructor(
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        const videoPlayer = videojs(this.videoPlayer.nativeElement);

        this.activatedRoute.data
            .subscribe(data => {
                this.clip = data['clip'] as IClip;
                videoPlayer.src({
                    src: this.clip.clipUrl,
                    type: 'video/mp4'
                });
            });
    }

}
