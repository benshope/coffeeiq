import { Routes } from '@angular/router';

import { GroupExistsGuard } from './guards/group-exists';
import { FindGroupPageComponent } from './containers/find-group-page';
import { ViewGroupPageComponent } from './containers/view-group-page';
import { CollectionPageComponent } from './containers/collection-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { PricingPageComponent } from './containers/pricing-page';

export const routes: Routes = [
  {
    path: '',
    component: CollectionPageComponent
  },
    {
    path: 'pricing',
    component: PricingPageComponent
  },
  {
    path: 'groups/list',
    component: FindGroupPageComponent
  },
  {
    path: 'groups/:id',
    canActivate: [ GroupExistsGuard ],
    component: ViewGroupPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
