import { Timestamp } from '@angular/fire/firestore';

export default interface IClip {
    uid: string;
    userName: string;
    title: string;
    fileName: string;
    clipUrl: string;
    docId?: string;
    timestamp: Timestamp;
}
