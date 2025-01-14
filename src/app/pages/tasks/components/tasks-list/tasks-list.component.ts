import {Component} from '@angular/core';
import {ITask, TasksService} from '../../services/tasks.service';
import {NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {Router} from '@angular/router';



@Component({
  selector: 'ngx-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  defaultColumns = [ 'name', 'assignee', 'status', 'contractType', 'startDate', 'endDate', 'actions'];
  allColumns = this.defaultColumns;

  dataSource: NbTreeGridDataSource<ITask[]>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private readonly _navigate: Router,
    private readonly _tasksService: TasksService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<ITask[]>,
  ) {
    this.getTasks();
  }

  private getTasks() {
    this._tasksService.getAllTask(1).then(tasks => {
      this.dataSource = this.dataSourceBuilder.create(tasks.map(t => ({data: t})));
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
    this._navigate.navigate(['pages', 'add-task']);
  }

  onDelete(item: any) {
    console.log(item);
    if (window.confirm('Are you sure you want to delete?')) {
      this._tasksService.delete(item.id).then(() => {
        this.getTasks();
      }).catch(e => {
        alert(e.error || e.message);
        console.log(e);
      });
    }
  }

  onEdit(data) {
    this._navigate.navigate(['pages', 'tasks', data.id]);
  }
}
