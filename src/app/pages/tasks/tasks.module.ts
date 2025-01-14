import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import {TasksListComponent} from './components/tasks-list/tasks-list.component';
import {FormsModule} from '@angular/forms';
import {
  NbActionsModule, NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule, NbSelectModule, NbTreeGridModule,
  NbUserModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {TasksService} from './services/tasks.service';
import {EditTaskComponent} from './components/edit-task/edit-task.component';



@NgModule({
  providers: [TasksService],
  declarations: [
    AddTaskFormComponent,
    EditTaskComponent,
    TasksListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbCheckboxModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    RouterModule,
    NbTreeGridModule,
  ],
})
export class TasksModule { }
