import { Timestamp } from '@angular/fire/firestore';

export default interface IClip {
    uid: string;
    userName: string;
    title: string;
    fileName: string;
    clipUrl: string;
    screenshotFileName: string;
    screenshotUrl: string;
    docId?: string;
    timestamp: Timestamp;
}
