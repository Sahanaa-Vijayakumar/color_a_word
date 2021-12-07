import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  constructor(private httpClient: HttpClient) {}
}

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  API_URL = 'https://www.googleapis.com/customsearch/v1';
  API_KEY = 'AIzaSyCA5qY2Gv-fnSlDZNYOreuIXsnK16igIso';
  CSEID = '238f033fe8369b3e3';

  constructor(private http: HttpClient) {}

  search(searchTerm: string) {
    let params = new HttpParams();
    params = params.append('key', this.API_KEY);
    params = params.append('cx', this.CSEID);
    params = params.append('q', searchTerm);
    params = params.append('exactTerms', searchTerm);
    params = params.append('searchType', 'image');
    params = params.append('imgType', 'photo');
    return this.http.get(this.API_URL, { params: params });
  }
}
