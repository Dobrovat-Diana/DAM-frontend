import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class HttpClientCustom {
  private _baseUrl = environment.apiUrl;
  private _headers: HttpHeaders ;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthService,
  ) {
    this._headers = new HttpHeaders();
    this._headers.append('Content-Type', 'application/json');
  }

  public login(payload: { 'userEmail': string,  'password': string,  'userRole': string}) {
    this.post('api/users/login', payload);
  }

  public simpleGet(relativeUrl?: string): Promise<any> {
    return this._httpClient.get(this._baseUrl + '/' + relativeUrl,  { withCredentials: true }).toPromise();
  }

  public get(relativeUrl?: string, qParams?: any): Promise<any> {
    return this._httpClient.get(this._baseUrl + '/' + relativeUrl, {
      params: qParams, withCredentials: true,
    }).toPromise();
  }

  public delete(relativeUrl?: string, qParams?: any): Promise<any> {
    return this._httpClient.delete(this._baseUrl + '/' + relativeUrl, {
      params: qParams, withCredentials: true,
    }).toPromise();
  }
  public post(relativeUrl: string, payload: any): Promise<any> {
    return this._httpClient.post(this._baseUrl + '/' + relativeUrl, payload,
      { headers: this._headers, withCredentials: true}).toPromise();
  }
  public put(relativeUrl: string, payload: any): Promise<any> {
    return this._httpClient.put(this._baseUrl + '/' + relativeUrl, payload,
      { headers: this._headers, withCredentials: true}).toPromise();
  }
  public postAndDownload(relativeUrl: string, payload: any): Promise<any> {
    return this._httpClient.post(this._baseUrl + '/' + relativeUrl, payload,
      { headers: this._headers, responseType: 'blob'}).toPromise();
  }
}
