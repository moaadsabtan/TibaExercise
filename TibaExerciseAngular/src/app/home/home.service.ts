
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { GitRepository } from '../_models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  searchRepositories(search :string) :Observable<GitRepository[]>{
    let params = new HttpParams();
    params = params.append('Search',search? search.toString():'');
    return this.http.get<GitRepository[]>(`${environment.apiUrl}/Git/SearchRepositories`,{params: params});
}
}
