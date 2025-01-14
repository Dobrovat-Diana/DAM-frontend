import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersService} from './services/users.service';



@NgModule({
  providers: [UsersService],
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class UsersModule { }
