import { Injectable } from '@angular/core';
import {HttpClientCustom} from '../../../services/http.client';
import * as moment from 'moment';


export interface ITask {
  id: number;
  name: string;
  user: number;
  contract: number;
  status: string;
  contractType: string;
  startDate: string;
  endDate: string;
}

@Injectable()
export class TasksService {

  constructor(private _httpService: HttpClientCustom) { }

  public getAllTask(contractId: number): Promise<ITask[]> {
    return this._httpService.get('api/tasks', {contractId}).then(r => {
      return r.map(c => {
        return {
          id: c.id,
          name: c.name,
          status: c.status,
          contract: c.contract,
          assignee: c.assignee.firstName + ' ' + c.assignee.lastName,
          contractType: c.contract.contractType,
          startDate: moment(c.contract.startDate).format('DD-MM-YYYY'),
          endDate: moment(c.contract.endDate).format('DD-MM-YYYY'),
        };
      });
    });
  }

  public save(payload: {}): Promise<any> {
    return this._httpService.post('api/tasks', payload);
  }

  public edit(id, payload: {}): Promise<any> {
    return this._httpService.put('api/tasks/' + id, payload);
  }

  public delete(id: number) {
    return this._httpService.delete('api/tasks/' + id);
  }

  public getTask(id: number) {
    return this._httpService.get('api/tasks/' + id);
  }
}
