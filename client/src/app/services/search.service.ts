import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  user = {search:''};


  constructor(private http: HttpClient) { }

  getSearchService(): Promise<any>{
    return this.http.get<any>('/api/search?q=').toPromise();
  }
}
