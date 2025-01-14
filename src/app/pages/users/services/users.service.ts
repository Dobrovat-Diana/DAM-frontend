import { Injectable } from '@angular/core';
import {HttpClientCustom} from '../../../services/http.client';

interface User {
  name: string;
  email: string;
}

@Injectable()
export class UsersService {

  constructor(private _httpService: HttpClientCustom) { }

  public getUsers(): Promise<User[]> {
    return this._httpService.simpleGet('api/users').then(users => users.map(user => {
      return {
        ...user,
        name: user.firstName + ' ' + user.lastName,
      };
    }));
  }
}
