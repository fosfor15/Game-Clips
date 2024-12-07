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
    orderBy,
    limit,
    startAfter,
    QueryConstraint,
    QueryDocumentSnapshot,
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
    public clipsPage: IClip[] = [];
    private lastClip: QueryDocumentSnapshot | null = null;

    private pendingRequest: boolean = false;
    public isAllClipsDownloaded: boolean = false;


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

        const screenshotRef = ref(this.storageService, `screenshots/${clip.screenshotFileName}`);
        deleteObject(screenshotRef);
    }

    public async getClips(): Promise<any> {
        if (this.pendingRequest) {
            return;
        }

        const queryParams: QueryConstraint[] = [
            orderBy('timestamp', 'desc'),
            limit(6)
        ];
        if (this.clipsPage.length) {
            queryParams.push(startAfter(this.lastClip));
        }

        const queryRef = query(this.clipsCollection, ...queryParams);

        this.pendingRequest = true;
        const snapshots = await getDocs(queryRef);
        this.pendingRequest = false;

        if (!snapshots.docs.length) {
            this.isAllClipsDownloaded = true;
            return;
        }

        this.clipsPage = this.clipsPage.concat(
            snapshots.docs.map(doc => {
                const docData = doc.data();
                return {
                    ...docData,
                    docId: doc.id
                } as IClip;
            })
        );
        this.lastClip = snapshots.docs.at(-1) ?? null;
    }

}
