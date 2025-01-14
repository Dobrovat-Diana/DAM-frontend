import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {TasksListComponent} from './tasks/components/tasks-list/tasks-list.component';
import {ClientsListComponent} from './clients/components/clients-list/clients-list.component';
import {AddTaskFormComponent} from './tasks/components/add-task-form/add-task-form.component';
import {EditTaskComponent} from './tasks/components/edit-task/edit-task.component';
import {AddClientComponent} from './clients/components/add-client/add-client.component';
import {EditClientComponent} from './clients/components/edit-client/edit-client.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'tasks',
      component: TasksListComponent,
    },
    {
      path: 'add-task',
      component: AddTaskFormComponent,
    },
    {
      path: 'tasks/:id',
      component: EditTaskComponent,
    },
    {
      path: 'clients',
      component: ClientsListComponent,
    },
    {
      path: 'add-client',
      component: AddClientComponent,
    },
    {
      path: 'clients/:id',
      component: EditClientComponent,
    },
    {
      path: '',
      redirectTo: 'tasks',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
