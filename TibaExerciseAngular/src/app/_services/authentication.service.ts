﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
      const currentUser :string|null = 'currentUser';
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(currentUser)|| '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/Users/authenticate`, { Username: username, Password: password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        const user = new User();
        this.currentUserSubject.next(user);
    }
    changeUserType(user: User) {
      // remove user from local storage to log user out
      return this.http.post<any>(`${environment.apiUrl}/Users/CahangeUserType`, user)
      .pipe(map(userRes => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(userRes));
        this.currentUserSubject.next(userRes);
      }));

  }
}
