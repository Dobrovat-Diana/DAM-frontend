import { Injectable } from '@angular/core';
import {HttpClientCustom} from '../../../services/http.client';

@Injectable()
export class ClientsService {

  constructor(private _httpService: HttpClientCustom) { }

  public getAllClients(): Promise<any[]> {
    return this._httpService.get('api/clients').then(r => {
      return r;
    });
  }

  public save(payload: {}): Promise<any> {
    return this._httpService.post('api/clients', payload);
  }

  public edit(id, payload: {}): Promise<any> {
    return this._httpService.put('api/clients/' + id, payload);
  }

  public delete(id: number) {
    return this._httpService.delete('api/clients/' + id);
  }

  public getClient(id: number) {
    return this._httpService.get('api/clients/' + id);
  }
}
