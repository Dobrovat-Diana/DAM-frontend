import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {TasksModule} from './tasks/tasks.module';
import {UsersModule} from './users/users.module';
import {ClientsModule} from './clients/clients.module';
import {ContractsModule} from './contracts/contracts.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    ContractsModule,
    UsersModule,
    ClientsModule,
    TasksModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
