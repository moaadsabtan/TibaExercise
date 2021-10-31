import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  visibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient) {
    }
    resetUser(username: string, password: string, identityNumber: string) {
      return this.http.post<number>(`${environment.apiUrl}/Users/resetUser`,
       { Username: username, Password: password, IdentityNumber: identityNumber });
    }
    show() {
      this.visibility.next(true);
    }

    hide() {
      this.visibility.next(false);
    }
}
