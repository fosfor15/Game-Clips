import { Injectable } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import {
    CollectionReference,
    DocumentData,
    Firestore,
    QuerySnapshot,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    collection,
    query,
    where,
    updateDoc
} from '@angular/fire/firestore';
import { Storage, ref, deleteObject } from '@angular/fire/storage';

import IClip from '../models/clip.model';


@Injectable({
    providedIn: 'root'
})
export default class ClipsService {

    private clipsCollection: CollectionReference;

    constructor(
        private authService: Auth,
        private firestoreService: Firestore,
        private storageService: Storage
    ) {
        this.clipsCollection = collection(firestoreService, 'clips');
    }

    public async createClip(data: IClip): Promise<DocumentData> {
        return await addDoc(this.clipsCollection, data);
    }

    public async getUserClips(): Promise<QuerySnapshot<DocumentData, DocumentData>> {
        return await getDocs(query(
            this.clipsCollection,
            where('uid', '==', this.authService.currentUser?.uid)
        ));
    }

    public async updateClip(id: string, title: string): Promise<void> {
        const clipRef = doc(this.firestoreService, 'clips', id);
        return await updateDoc(clipRef, { title });
    }

    public async deleteClip(clip: IClip): Promise<void> {
        const fileRef = ref(this.storageService, `clips/${clip.fileName}`);
        await deleteObject(fileRef);

        const clipRef = doc(this.firestoreService, 'clips', clip.docId as string);
        await deleteDoc(clipRef);
    }

}
