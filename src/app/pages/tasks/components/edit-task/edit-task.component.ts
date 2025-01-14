import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../users/services/users.service';
import {BehaviorSubject} from 'rxjs';
import {ContractsService} from '../../../contracts/services/contracts.service';
import {TasksService} from '../../services/tasks.service';



@Component({
  selector: 'ngx-add-task-form',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  public readonly statusOptions = ['NEW', 'WORK_IN_PROGRESS', 'UNDER_REVIEW', 'COMPLETED', 'SKIPPED'];
  public readonly contractsOptions$ = new BehaviorSubject([]);
  public readonly usersOptions$: BehaviorSubject<any[]> =  new BehaviorSubject([]);
  public taskName = '';
  public selectedUser;
  public selectedContract;
  public selectedStatus;
  public taskId: number;

  constructor(
    private readonly _navigate: Router,
    private readonly activeRoute: ActivatedRoute,
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

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.taskId = +params['id'];
      this._tasksService.getTask(this.taskId).then(task => {
        const contracts = this.contractsOptions$.value;
        const users = this.usersOptions$.value;

        this.taskName = task.name;
        this.selectedContract = contracts.find(c => c.id === task.contract.id);
        this.selectedUser = users.find(u => u.id === task.assignee.id);
        this.selectedStatus = task.status;
      }).catch(error => {

        console.error(error);
      });
    });
  }

  onSave($event: any) {
    $event.preventDefault();
    if (this.selectedUser && this.selectedStatus && this.selectedContract && this.taskName) {
      const p = {
        id: this.taskId,
        name: this.taskName,
        status: this.selectedStatus,
        contract: this.selectedContract,
        assignee: this.selectedUser,
      };
      this._tasksService.edit(this.taskId, p).then(r => {
        if (r) {
          this._navigate.navigate(['pages', 'tasks']);
        }
      }).catch(e => {
        console.log(e);
        alert(e.error?.error || e.message);
      });
    }
  }

  onBack() {
    window.history.back();
  }
}
