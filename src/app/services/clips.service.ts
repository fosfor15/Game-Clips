import { Injectable } from '@angular/core';

import { addDoc, collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';

import IClip from '../models/clip.model';


@Injectable({
    providedIn: 'root'
})
export default class ClipsService {

    private clipsCollection: CollectionReference;

    constructor(
        private firestoreService: Firestore
    ) {
        this.clipsCollection = collection(firestoreService, 'clips');
    }

    public async createClip(data: IClip): Promise<DocumentData> {
        return await addDoc(this.clipsCollection, data);
    }

}
