import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesComponent } from './repositories.component';
import { RepositoriesViewComponent } from './repositories-view/repositories-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':user/:repos/view',
        component: RepositoriesViewComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        component: RepositoriesComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepositoriesRoutingModule {}
