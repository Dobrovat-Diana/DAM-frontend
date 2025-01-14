import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContractsService} from './services/contracts.service';



@NgModule({
  providers: [ContractsService],
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class ContractsModule { }
