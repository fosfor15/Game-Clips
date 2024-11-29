import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

    public sortType: '1' | '2' = '1';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams
            .subscribe((params: Params) => {
                this.sortType = params['sort'];
            });
    }

    public onSelect(event: Event): void {
        this.sortType = (event.target as HTMLSelectElement).value as '1' | '2';
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                sort: this.sortType
            }
        });
    }

}
