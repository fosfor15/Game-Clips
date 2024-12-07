import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { doc, Firestore, getDoc } from '@angular/fire/firestore';

import IClip from 'src/app/models/clip.model';


@Injectable()
export class GetClipResolver {

    constructor(
        private firestoreService: Firestore
    ) {}

    async resolve(route: ActivatedRouteSnapshot): Promise<IClip | null> {
        const snapshot = await getDoc(
            doc(this.firestoreService, 'clips', route.paramMap.get('id') as string)
        );

        if (!snapshot.exists()) {
            return null;
        }
        return snapshot.data() as IClip;
    };

}
