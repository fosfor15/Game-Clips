import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import ClipsService from 'src/app/services/clips.service';
import { ModalService } from 'src/app/services/modal.service';

import IClip from 'src/app/models/clip.model';


@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

    public clips: IClip[] = [];
    public activeClip: IClip | null = null;

    public sortType: '1' | '2' = '1';


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private clipsService: ClipsService,
        private modalService: ModalService
    ) {}

    async ngOnInit() {
        this.activatedRoute.queryParams
            .subscribe((params: Params) => {
                this.sortType = params['sort'];
            });

        const queryResults = await this.clipsService.getUserClips();
        queryResults.forEach(document => {
            const data = document.data();
            this.clips.push({
                uid: data['uid'],
                userName: data['userName'],
                title: data['title'],
                fileName: data['fileName'],
                clipUrl: data['clipUrl'],
                docId: document.id,
                timestamp: data['timestamp']
            })
        });
        this.sortClips(this.sortType);

        this.modalService.register('editClip');
    }


    public onSelect(event: Event): void {
        this.sortType = (event.target as HTMLSelectElement).value as typeof this.sortType;
        this.sortClips(this.sortType);

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                sort: this.sortType
            }
        });
    }

    private sortClips(sortType: typeof this.sortType): void {
        if (sortType == '1') {
            this.clips.sort((clip1, clip2) => clip2.timestamp.toMillis() - clip1.timestamp.toMillis());
        } else {
            this.clips.sort((clip1, clip2) => clip1.timestamp.toMillis() - clip2.timestamp.toMillis());
        }
    }

    public trackByDocId: TrackByFunction<IClip> = (index: number, clip: IClip): string => {
        return clip.docId as string
    }

    public editClip(event: Event, clip: IClip): void {
        event.preventDefault();
        this.activeClip = clip;
        this.modalService.toggleVisible('editClip');
    }

    public updateActiveClip(updatingClip: IClip): void {
        const clipToUpdate = this.clips.find(clip => clip.docId == updatingClip.docId);
        clipToUpdate!.title = updatingClip.title;

        setTimeout(() => {
            this.modalService.toggleVisible('editClip');
        }, 1.5e3);
    }

    public async deleteClip(event: Event, deletingClip: IClip): Promise<void> {
        event.preventDefault();
        await this.clipsService.deleteClip(deletingClip);
        this.clips = this.clips.filter(clip => clip.docId != deletingClip.docId);
    }

}
