import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'app-clip',
    templateUrl: './clip.component.html',
    styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {

    id: string = '';

    constructor(
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.params
            .subscribe((params: Params) => {
                this.id = params['id'];
            });
    }

}
