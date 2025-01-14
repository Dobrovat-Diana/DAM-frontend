import {Component} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent {
  defaultColumns = [ 'name', 'email', 'domain', 'phone',  'actions'];
  allColumns = this.defaultColumns;

  dataSource: NbTreeGridDataSource<any[]>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  constructor(
    private readonly _navigate: Router,
    private _clientService: ClientsService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any[]>,
  ) {
    this.getData();
  }

  private getData() {
    this._clientService.getAllClients().then(clients => {
      this.dataSource = this.dataSourceBuilder.create(clients.map(t => ({data: t})));
    });
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  goToAddTask() {
    this._navigate.navigate(['pages', 'add-client']);
  }

  onDelete(item: any) {
    console.log(item);
    if (window.confirm('Are you sure you want to delete?')) {
      this._clientService.delete(item.id).then(() => {
        this.getData();
      }).catch(e => {
        alert(e.error || e.message);
        console.log(e);
      });
    }
  }

  onEdit(data) {
    this._navigate.navigate(['pages', 'clients', data.id]);
  }

}
