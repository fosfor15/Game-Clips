import { Component, Input, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { fromEvent, sampleTime, Subscription } from 'rxjs';
import IClip from 'src/app/models/clip.model';

import ClipsService from 'src/app/services/clips.service';


@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css']
})
export class ClipsListComponent implements OnInit, OnDestroy {

    @Input() scrollable: boolean = true;

    private scrollSub!: Subscription;

    constructor(
        protected readonly clipsService: ClipsService
    ) {}

    ngOnInit(): void {
        this.clipsService.getClips();

        if (this.scrollable) {
            this.scrollSub = fromEvent(window, 'scroll')
                .pipe(sampleTime(100))
                .subscribe(this.handleScroll);
        }
    }

    ngOnDestroy(): void {
        this.clipsService.clipsPage = [];

        if (this.scrollable) {
            this.scrollSub.unsubscribe();
        }
    }

    private handleScroll = () => {
        if (this.clipsService.isAllClipsDownloaded) {
            this.scrollSub.unsubscribe();
            return;
        }

        const { scrollTop, offsetHeight } = document.documentElement;
        const { innerHeight } = window;
        const isBottomOfPageReached = Math.round(scrollTop) + innerHeight > offsetHeight - 150;

        if (isBottomOfPageReached) {
            this.clipsService.getClips();
        }
    };

    public trackByDocId: TrackByFunction<IClip> = (index: number, clip: IClip): string => {
        return clip.docId as string
    }

}
