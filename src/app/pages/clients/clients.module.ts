import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ClientsService} from './services/clients.service';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { AddClientComponent } from './components/add-client/add-client.component';
import {EditClientComponent} from './components/edit-client/edit-client.component';


@NgModule({
  providers: [ClientsService],
  declarations: [
    ClientsListComponent,
    AddClientComponent,
    EditClientComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbTreeGridModule,
    NbOptionModule,
    NbSelectModule,
  ],
})
export class ClientsModule { }
