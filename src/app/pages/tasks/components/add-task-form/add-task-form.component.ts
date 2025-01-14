import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../../users/services/users.service';
import {BehaviorSubject} from 'rxjs';
import {ContractsService} from '../../../contracts/services/contracts.service';
import {TasksService} from '../../services/tasks.service';



@Component({
  selector: 'ngx-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent {
  public readonly statusOptions = ['NEW', 'WORK_IN_PROGRESS', 'UNDER_REVIEW', 'COMPLETED', 'SKIPPED'];
  public readonly contractsOptions$ = new BehaviorSubject([]);
  public readonly usersOptions$: BehaviorSubject<any[]> =  new BehaviorSubject([]);
  public taskName = '';
  public selectedUser;
  public selectedContract;
  public selectedStatus;

  constructor(
    private readonly _navigate: Router,
    private readonly _userService: UsersService,
    private readonly _tasksService: TasksService,
    private readonly _contractsService: ContractsService,
  ) {
    this._userService.getUsers().then(users => {
      this.usersOptions$.next(users);
    });
    this._contractsService.getAllContracts().then(contracts => {
      this.contractsOptions$.next(contracts);
    });
  }

  onSave($event: any) {
    $event.preventDefault();
    if (this.selectedUser && this.selectedStatus && this.selectedContract && this.taskName) {
      const p = {
        name: this.taskName,
        status: this.selectedStatus,
        contract: this.selectedContract,
        assignee: this.selectedUser,
      };
      this._tasksService.save(p).then(r => {
        if (r) {
          this._navigate.navigate(['pages', 'tasks']);
        }
      }).catch(e => {
        console.log(e);
        alert(e.error);
      });
    }
  }

  onBack() {
    window.history.back();
  }
}
