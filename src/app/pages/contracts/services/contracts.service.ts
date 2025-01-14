import { Injectable } from '@angular/core';
import {HttpClientCustom} from '../../../services/http.client';

enum ContractType {

  TYPE1, TYPE2, TYPE3, TYPE4,

}


interface IContract {
  id: number;
  name: string;
  type: ContractType;
  endDate: string;
  manMays: number;
  startDate: string;
  contract_allocation_id: number;
  client_id: number;
  manager: Record<string, any>;
}

@Injectable()
export class ContractsService {

  constructor(private _httpService: HttpClientCustom) { }

  public getAllContracts(): Promise<IContract[]> {
    return this._httpService.get('api/contracts').then(result => {
      return result.map(r => {
        return {
          id: r.id,
          type: r.contractType,
          endDate: r.endDate,
          startDate: r.startDate,
          manMays: r.manMays,
          name: r.contractType,
          manager: r.manager,
        };
      });
    });
  }
}
