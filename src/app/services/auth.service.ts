import { Injectable } from '@angular/core';

import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';

import { delay } from 'rxjs';

import IUser from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authState$ = authState(this.authService);
    authStateWithDelay$ = this.authState$.pipe(delay(1500));

    constructor(
        private authService: Auth,
        private firestoreService: Firestore
    ) {}

    public async createUser(userData: IUser): Promise<void> {
        const { email, password, ...otherUserData } = userData;

        const userCred = await createUserWithEmailAndPassword(
            this.authService,
            email,
            password
        );

        await setDoc(
            doc(this.firestoreService, 'users', userCred.user.uid),
            { ...otherUserData, email }
        );

        await updateProfile(
            userCred.user,
            { displayName: userData.name }
        );
    }

}
