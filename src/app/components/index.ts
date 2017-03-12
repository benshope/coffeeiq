import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GroupAuthorsComponent } from './group-authors';
import { GroupDetailComponent } from './group-detail';
import { GroupPreviewComponent } from './group-preview';
import { GroupPreviewListComponent } from './group-preview-list';
import { GroupSearchComponent } from './group-search';
import { LayoutComponent } from './layout';
import { NavItemComponent } from './nav-item';
import { SidenavComponent } from './sidenav';
import { ToolbarComponent } from './toolbar';

import { PipesModule } from '../pipes';


export const COMPONENTS = [
  GroupAuthorsComponent,
  GroupDetailComponent,
  GroupPreviewComponent,
  GroupPreviewListComponent,
  GroupSearchComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
