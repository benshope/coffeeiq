import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth';

import { GroupFormComponent } from './components/group-form';
import { GroupItemComponent } from './components/group-item';
import { GroupListComponent } from './components/group-list';
import { GroupsComponent } from './components/groups';
import { AutoFocusDirective } from './directives/autofocus-directive';
import { GroupService } from './services/group-service';


const routes: Routes = [
  {path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
    AutoFocusDirective,
    GroupFormComponent,
    GroupItemComponent,
    GroupListComponent,
    GroupsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    GroupService
  ]
})

export class GroupsModule {}

export { GroupService };
