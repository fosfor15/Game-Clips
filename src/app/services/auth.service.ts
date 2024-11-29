import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Auth, authState, createUserWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';

import { delay, filter, map, switchMap } from 'rxjs';

import IUser from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authState$ = authState(this.authService);
    authStateWithDelay$ = this.authState$.pipe(delay(1500));

    private logoutRedirect: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: Auth,
        private firestoreService: Firestore
    ) {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => {
                    let currentRoute = this.activatedRoute;
                    while (currentRoute.firstChild) {
                        currentRoute = currentRoute.firstChild;
                    }
                    return currentRoute;
                }),
                switchMap(route => route.data)
            )
            .subscribe(data => {
                this.logoutRedirect = data['authRequired'] || false;
            });
    }

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

    public async logout() {
        await signOut(this.authService);
        if (this.logoutRedirect) {
            await this.router.navigateByUrl('/');
        }
    }

}
